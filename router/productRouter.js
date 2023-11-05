const express = require('express');
// const { route } = require('express/lib/application');
const router = express.Router(); // server istekleri rotalaması router variablelarına bağlanıyor.
const Product = require('../models/productModel'); // açıklama için ctrl + click 


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










module.exports = router;