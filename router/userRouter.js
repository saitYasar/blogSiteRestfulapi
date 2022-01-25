const express = require('express');
// const { route } = require('express/lib/application');
const router = express.Router(); // server istekleri rotalaması router variablelarına bağlanıyor.
const User = require('../models/userModel'); // açıklama için ctrl + click 
var createError = require('http-errors') // eklenti hata fırlatma kolaylaştırılıyor.
const bcrypt = require('bcrypt');

router.get('/' , async (req,res) => {
    const tumUserlar = await User.find({});
    res.json(tumUserlar);
})
;
router.get('/:id' ,(req,res) => {
    res.json({mesaj:"idsi:" +req.params.id+" olan user listelenecek"});
})
;


router.post('/' , async (req,res,next) => {
    try {
        const eklenecekUSer = new User(req.body);
        eklenecekUSer.sifre = await bcrypt.hash(eklenecekUSer.sifre,8) // şifre mongodb de hasli görünsün diye bcryptledik


        const {error, value} = eklenecekUSer.joiValidation(req.body);
        if(error) {
            next(createError(400, error));
            console.log("user kaydederken hata"+ err);

        }else{
            const sonuc = await eklenecekUSer.save();
            res.json(sonuc);
        }
                               
    } catch (err){
        next(err);
        console.log("user kaydederken hata"+ err);
    }
    
});

router.post('/giris', async (req, res, next) => {

  try {
    const user = await User.girisYap(req.body.email, req.body.sifre);
    res.json(user);
    
   } catch (hata) {
    next(hata);
    
    }
});


router.patch('/:id', async (req,res,next) => {
    delete req.body.createdAt;
    delete req.body.updatedAt;

    if (req.body.hasOwnProperty('sifre')) {
    req.body.sifre = await bcrypt.hash(req.body.sifre, 10);
        
    }
    
    const { error, value } = User.JoiValidationForUpdate(req.body);
    if(error) {
        next(createError(400,error));


    }else{
        try {
            const sonuc = await User.findByIdAndUpdate({_id:req.params.id}, req.body,
                 {new:true, runValidators:true}); // new optionsu orijinal belge yerine değiştirilen belgeyi döndürür.
        
            if (sonuc) {
                return res.json(sonuc);
                
            }else {
                throw createError(404, 'kullanıcı bulunamadı');
            }
        
               
           } catch (e) {
            next(createError(400,e));
               
               
           }
          

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
    
    throw createError(404, 'kullanıcı bulunamadı');
     }
}catch(e){
        next(createError(400,e));

    }
  
});








module.exports = router;