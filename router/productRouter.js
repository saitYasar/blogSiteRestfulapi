const express = require('express');
// const { route } = require('express/lib/application');
const router = express.Router(); // server istekleri rotalaması router variablelarına bağlanıyor.
const Product = require('../models/productModel'); // açıklama için ctrl + click 
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // açıklama için ctrl + click 
const Basket = require('../models/basketModel');
const { log } = require('surge/lib/middleware/util/helpers');





router.get('/products' , async (req,res) => {
  console.log('sasd');
    const allProducts = await Product.find();
    console.log(allProducts);
    res.json(allProducts);
})
router.get('/product' , async (req,res) => {
  console.log('saşt');
    const param1 = req.query.param1;
    const allProducts = await Product.find({_id: param1});
    res.json(allProducts);
})
router.post('/products',async (req,res) => {
    console.log('sait');
    console.log(req.body);
    const item = req.body
    console.log(item);

    const newItem = new Product(item);
    try {
        await newItem.save();
        res.status(201).json(newItem);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Veri eklenirken bir hata oluştu.' });
      }
} ) 


router.get('/getbasket', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        const cart = await Basket.findById(user.cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Sepet bulunamadı' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Sunucu hatası' });
    }
})

router.post('/addbasket', async (req, res) => {
    console.log(req.body);
  
    try {
      const token = req.body.token
      console.log(token);
      const decoded = jwt.verify(token, 'gizliAnahtar');
      const usersBasket = await Basket.findOne({'owner' :decoded.user._id} );
      usersBasket.productList.push(req.body.userData._id)
      await usersBasket.save();
      res.status(201).json(usersBasket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Veri eklenirken bir hata oluştu.' });
    }
})
router.put('/updatebasket', async (req, res) => {
    const itemId = req.params.itemId; 
    const updateData = req.body;

    try {
        const item = await Product.findById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Ürün bulunamadı' });
        }
        item = updateData
        await item.save();

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ürün güncellenirken bir hata oluştu' });
    }
});

router.delete('/deletebasket', async (req, res) => {
    const itemId = req.params.itemId

    try {
        const item = await Product.findById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Ürün bulunamadı' });
        }

        await item.remove();

        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ürün kaldırılırken bir hata oluştu' });
    }
});









module.exports = router;