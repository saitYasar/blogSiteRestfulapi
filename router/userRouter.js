const express = require('express');
// const { route } = require('express/lib/application');
const router = express.Router(); // server istekleri rotalaması router variablelarına bağlanıyor.
const User = require('../models/userModel'); // açıklama için ctrl + click 
var createError = require('http-errors') // eklenti hata fırlatma kolaylaştırılıyor.
const bcrypt = require('bcrypt');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');



router.get('/' , [authMiddleware,adminMiddleware], async (req,res) => {
    const tumUserlar = await User.find({});
    res.json(tumUserlar);
})
;
router.get('/:me',authMiddleware,(req,res) => {
   res.json(req.user);

    
    
})
;
router.patch('/:me',authMiddleware, async (req,res) => {
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
            const sonuc = await User.findByIdAndUpdate({_id: req.user._id}, req.body,
                 {new:true, runValidators:true}); // new optionsu orijinal belge yerine değiştirilen belgeyi döndürür.
        
            if (sonuc) {
                return res.json(sonuc);
                
            }else {
                return res.status(400).json({
                    mesaj:"kullanıcı bulunamadı",
                })
            }
        
               
           } catch (e) {
            next(createError(400,e));
               
               
           }
          

    }
 
     
     
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
    const token = await user.generateToken();
    res.json({
        user,
        token
    }
    );
    
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

router.delete('/deleteAll', [authMiddleware,adminMiddleware], async (req,res,next) => {
    try{ const sonuc = await User.deleteMany({isAdmin: false})
       if(sonuc){
     return res.json({ mesaj:"Admin olmuyan tüm kullanıcılar silindi",});

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
router.delete('/:me', authMiddleware , async (req,res,next) => {
    try{ const sonuc = await User.findByIdAndDelete({_id:req.user._id});
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

router.delete('/:id', [authMiddleware , adminMiddleware], async (req,res,next) => {
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