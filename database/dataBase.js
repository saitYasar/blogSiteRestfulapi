const mongoose = require('mongoose'); 


mongoose.connect('mongodb://localhost/restful_api') //mongoose bağlantısı
.then(() => console.log('veritabanına bağlanıldı'))
.catch(hata => console.log('db bağlantı hatası')); // hatayı yakalıyoruz.