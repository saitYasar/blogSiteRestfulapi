const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const Joi = require('@hapi/joi');
//Mongoose'daki her şey bir Şema ile başlar.
// Her şema bir MongoDB koleksiyonuyla eşleşir ve bu koleksiyondaki belgelerin şeklini tanımlar.

const UserSchema = new Schema({
    isim: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50 
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50,
     

    } ,
    email: {
        type :String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,


    },
    sifre: {
        type: String,
        required:true,
        trim: true,
    }
    }, { collection:'kullanıcılar' , timestamps: true}); 

    const schema = Joi.object({
            
        isim: Joi.string().min(3).max(50).trim(),
        userName: Joi.string().min(3).max(50).trim(),
        email: Joi.string().min(3).max(50).trim().email(),
        sifre : Joi.string().trim()
        // ya error gönderecek yada data ikisinden biri dolu oluyıor



    });






    // collection optionsu olmazsa mongodb de sonunsa 's takıyor onu engelliyor.
    UserSchema.methods.joiValidation = function(userObject){
        schema.required();

       
        return schema.validate(userObject);

    };


    UserSchema.methods.toJSON = function () {
        const user = this.toObject();
        delete user._id;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.sifre;
        delete user.__v;
        return user;
        // kullanıcıya giden jsonu düzenledik. hertülü buraya uğruyor.
    }



    UserSchema.statics.JoiValidationForUpdate = function(userObject){

        
        return schema.validate(userObject);

    }
    const User = mongoose.model('User', UserSchema); 
    //Şema tanımımızı kullanmak için blog Şemanızı birlikte çalışabileceğimiz bir Modele dönüştürmemiz gerekiyor.
    // Bunu yapmak için mongoose.model(model Name, schema) dosyasına aktarıyoruz:
  
//usershemaya bir method daha ekliyoruz joi validation diye;
    module.exports = User;











