const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        minlength: 3,
        maxlength: 50,
     

    } ,
    email: {
        type :String,
        required: true,
        unique: true,
        trim: true,


    },
    sifre: {
        type: String,
        required:true,
        trim: true,
    }
    }, { collection:'kullanıcılar'}); // sonuna s takma konusunda yardımcı oluyor.
    const User = mongoose.model('User', UserSchema);

    module.exports = User;











