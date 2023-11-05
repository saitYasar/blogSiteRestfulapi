const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const Joi = require('@hapi/joi');
var createError = require('http-errors')
const jwt = require('jsonwebtoken')
//Mongoose'daki her şey bir Şema ile başlar.
// Her şema bir MongoDB koleksiyonuyla eşleşir ve bu koleksiyondaki belgelerin şeklini tanımlar.

const UserSchema = new Schema({
    email: {
        type :String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,


    },
    password: {
        type: String,
        required:true,
        minlength: 6,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    }, { collection:'kullanıcılar' , timestamps: true}); 

    const schema = Joi.object({
            
        email: Joi.string().min(3).max(50).trim().email(),
        sifre : Joi.string().trim().min(6),
        isAdmin: Joi.boolean(),



    });
    UserSchema.methods.generateToken = async function () {
        const girisYapanUser = this;
        const token = await jwt.sign({_id:girisYapanUser._id} , 
            'secretkey', {expiresIn: '1h'}
            );
        return token;
    }









    // collection optionsu olmazsa mongodb de sonunsa 's takıyor onu engelliyor.
    UserSchema.methods.joiValidation = function(userObject){
        schema.required();

       
        return schema.validate(userObject);

    };


    UserSchema.methods.toJSON = function () {
        const user = this.toObject();
        delete user.createdAt;
        delete user.updatedAt;
        delete user.password;
        delete user.__v;
        return user;
        // kullanıcıya giden jsonu düzenledik. hertülü buraya uğruyor.
    }
    UserSchema.statics.girisYap =  async (email, sifre) => {




        const {error, value} = schema.validate({email,password});

        if (error) {
            throw createError(400, "Gİrilen email/şifre hatal");

            
        }
        const user = await User.findOne({ email});
        if (!user) {
            throw createError(400,"girilem email/sifre hatalı" );


            
        } 

            
        


    }



    UserSchema.statics.JoiValidationForUpdate = function(userObject){

        
        return schema.validate(userObject);

    }
    const User = mongoose.model('User', UserSchema); 
    //Şema tanımımızı kullanmak için blog Şemanızı birlikte çalışabileceğimiz bir Modele dönüştürmemiz gerekiyor.
    // Bunu yapmak için mongoose.model(model Name, schema) dosyasına aktarıyoruz:
  
//usershemaya bir method daha ekliyoruz joi validation diye;
    module.exports = User;











