const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');
const User = require('../models/userModel')


const auth = async (req, res, next)=> {
    try {
        if(req.header('Authorization'))
        {
          const token = req.header('Authorization').
          replace('Bearer ', '');
          const sonuc = jwt.verify(token, 'secretkey');
          const bulunanUser = await User.findById({
          _id: sonuc._id
        });

        if (bulunanUser) {
          req.user = bulunanUser;
          
        } else {
          throw new Error('Lütfen giriş yapın');

          
        }
        
        next();
        }else{
          throw new Error('Lütfen giriş yapın');
        }

       } catch (error) {
        next(error)
        
         }

    




}

module.exports = auth;