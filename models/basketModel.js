const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const Joi = require('@hapi/joi');
var createError = require('http-errors')
const jwt = require('jsonwebtoken')

const BasketSchema = new Schema({
    productList: {
        type :Array,
        required: true,
        default: []
    },
    owner: {
        type : String,
        required: true, 
    }
    }, { collection:'baskets' , timestamps: true}); 

    const schema = Joi.object({
        
        productList: Joi.array().required(),
        owner: Joi.string().required
    
    });
    BasketSchema.methods.joiValidation = function(basketObject){
        schema.required();
        return schema.validate(basketObject);

    };

    const Basket = mongoose.model('basket', BasketSchema); 

    module.exports = Basket;











