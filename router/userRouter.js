const express = require('express');
// const { route } = require('express/lib/application');
const router = express.Router(); // server istekleri rotalaması router variablelarına bağlanıyor.
const User = require('../models/userModel'); // açıklama için ctrl + click 
var createError = require('http-errors') // eklenti hata fırlatma kolaylaştırılıyor.
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const jwt = require('jsonwebtoken');
const Basket = require('../models/basketModel')




router.post('/signup', async (req, res) => {

    const item = req.body
    const email = item.email
    const newItem = new User(item);
    try {
        await newItem.save();
        const user = await User.findOne({ email });
        const newBasket = new Basket({
            'owner' :  user._id
        })
        await newBasket.save()
        const token = jwt.sign({ user }, 'gizliAnahtar', { expiresIn: '1h' });
        const refreshToken = jwt.sign({ user }, 'gizliAnahtar');
    
    
        const tokens = {
            token,
            refreshToken
        }
        res.status(201).json([newItem, tokens]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Veri eklenirken bir hata oluştu.' });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
        return res.status(400).send('Kullanıcı bulunamadı.');
    }

    if (user.password !== password) {
        return res.status(401).send('Geçersiz şifre.');
    }

    const token = jwt.sign({ user }, 'gizliAnahtar', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ user }, 'gizliAnahtar');
    const tokens = {
        token,
        refreshToken
    }
    res.status(201).json([user, tokens]);
});
router.get('/me' , async (req,res) => {
      const token = req.headers.authorization
      const parts = token.split(' ');
      const tokenOrigin = parts[1];
      console.log(tokenOrigin);
      try {
        const decoded = jwt.verify(tokenOrigin, 'gizliAnahtar');
        console.log(decoded);
        const email = decoded.user.email
        const user = await User.findOne({ email });
        res.json(user);
      } catch (error) {
        res.json(error)
        console.error('Token çözme hatası: ' + error.message);
      }
})














module.exports = router;