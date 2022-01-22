const express = require('express');
// const { route } = require('express/lib/application');
const router = express.Router(); // server istekleri rotalaması router variablelarına bağlanıyor.
const User = require('../models/userModel'); // açıklama için ctrl + click 

router.get('/' , async (req,res) => {
    const tumUserlar = await User.find({});
    res.json(tumUserlar);
})
;
router.get('/:id' ,(req,res) => {
    res.json({mesaj:"idsi:" +req.params.id+" olan user listelenecek"});
})
;


router.post('/' , async (req,res) => {
    try {
        const eklenecekUSer = new User(req.body);
        const sonuc = await eklenecekUSer.save();
        res.json(sonuc);                       
    } catch (err){
        console.log("user kaydederken hata" + err);
    }
    
});
router.patch('/:id', async (req,res) => {
   try {
    const sonuc = await User.findByIdAndUpdate({_id:req.params.id}, req.body,
         {new:true, runValidators:true}); // new optionsu orijinal belge yerine değiştirilen belgeyi döndürür.

    if (sonuc) {
        return res.json(sonuc);
        
    }else {
        return res.status(404).json({mesaj:"kullanıcı bulunamadı"})
    }

       
   } catch (error) {
       console.log("güncelleme yapılamadı"+ error);
       
   }
  
}); // verilen idli userı güncelliyor.
router.delete('/:id', async (req,res,next) => {
    try{ const sonuc = await User.findByIdAndDelete({_id:req.params.id});
       if(sonuc){
     return res.json({ mesaj:"kullanıcı silinndi",});

    }else {
    //return res.status(404).json[{
    //  mesaj: "kullanıcı bulunamadı"
    // }]
    const hataNesnesi = new Error('kullanıcı bulunamadı');
    hataNesnesi.hataKodu = 404
    throw hataNesnesi;
     }
}catch(e){
        next(e);

    }
  
});








module.exports = router;