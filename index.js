const express = require('express'); // serverı ayağa kaldırıyoruz.
require('./database/dataBase') // mongoose bağlantısını yapıyoruz.
const hataMiddleWare = require('./middleware/hataMiddleware') // hataları yakalamak için mw.
const jwt = require('jsonwebtoken');

const userRouter = require('./router/userRouter') // routerları userRoutera tanımlıyoruz.
const productsRouter = require('./router/productRouter') // routerları userRoutera tanımlıyoruz.
const basketRouter = require('./router/basketRouter') // routerları userRoutera tanımlıyoruz.


const app = express();
const cors = require('cors');
const corsOptions = {
    origin: 'http://example.com', // İzin verilen köken
  };
  
  app.use(cors());



app.use(express.json()); // json okumak için mw.
app.use(express.urlencoded({extended: true})) // bodyler parse olması için mw.
app.use('/api/users', userRouter ); 
app.use('/api/basket', productsRouter ); 
app.use('/api/products', productsRouter ); 




app.get('/', (req,res) => {
    res.status(200).json({'mesaj': 'hoşgeldiniz'})
});
app.use(hataMiddleWare);

 









app.listen(3008, () => {
    console.log('server ayağa kalktı');
})