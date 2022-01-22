const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
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
    // collection optionsu olmazsa mongodb de sonunsa 's takıyor onu engelliyor.
    const User = mongoose.model('User', UserSchema); 
    //Şema tanımımızı kullanmak için blog Şemanızı birlikte çalışabileceğimiz bir Modele dönüştürmemiz gerekiyor.
    // Bunu yapmak için mongoose.model(model Name, schema) dosyasına aktarıyoruz:

    module.exports = User;











