const mongoose = require('mongoose'); 


mongoose.connect('mongodb://localhost/ecommorce-backend',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', () => {
  console.log('MongoDB bağlantısı başarılı.');
});