const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const Joi = require('@hapi/joi');
var createError = require('http-errors')
const jwt = require('jsonwebtoken')


const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50 
    },
    model: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50,
     

    } ,
    imageArray: {
        type: Array,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50,

    } ,
    addedDate: {
        type: String,
        required:true,
        minlength: 6,
        trim: true,
    },

    }, { collection:'Products' , timestamps: true}); 

    const schema = Joi.object({
            
        name: Joi.string().min(3).max(50).trim(),
        model: Joi.string().min(3).max(50).trim(),
        addedDate: Joi.string().min(3).max(50).trim(),
        imageArray: Joi.array()



    });
    ProductSchema.methods.joiValidation = function(productObject){
        schema.required();
        return schema.validate(productObject);

    };

    const Product = mongoose.model('Product', ProductSchema); 
    //Şema tanımımızı kullanmak için blog Şemanızı birlikte çalışabileceğimiz bir Modele dönüştürmemiz gerekiyor.
    // Bunu yapmak için mongoose.model(model Name, schema) dosyasına aktarıyoruz:
  
//usershemaya bir method daha ekliyoruz joi validation diye;
    module.exports = Product;











