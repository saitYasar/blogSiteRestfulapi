const express = require('express');
const router = express.Router(); // server istekleri rotalaması router variablelarına bağlanıyor.
const User = require('../models/userModel'); // açıklama için ctrl + click 
const Basket = require('../models/basketModel')


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
router.get('/product', async (req, res) => {
    console.log('saşt');
    const param1 = req.query.param1;
    const allProducts = await Product.find({ _id: param1 });
    res.json(allProducts);
})
router.post('/products', async (req, res) => {
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
}) 