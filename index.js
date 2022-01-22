const express = require('express'); // serverı ayağa kaldırıyoruz.
require('./database/dataBase') // mongoose bağlantısını yapıyoruz.
const hataMiddleWare = require('./middleware/hataMiddleware') // hataları yakalamak için mw.

const userRouter = require('./router/userRouter') // routerları userRoutera tanımlıyoruz.
const app = express();


app.use(express.json()); // json okumak için mw.
app.use(express.urlencoded({extended: true})) // bodyler parse olması için mw.
app.use('/api/users', userRouter ); 




app.get('/', (req,res) => {
    res.status(200).json({'mesaj': 'hoşgeldiniz'})
}); // ilk sayfa deneme amaçlı
app.use(hataMiddleWare);
app.listen(3000, () => {
    console.log('server ayağa kalktı');
})