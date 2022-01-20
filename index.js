const express = require('express');
require('./database/dataBase')
const userRouter = require('./router/userRouter')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})) // bodyler parse olması için
app.use('/api/users', userRouter );




app.get('/', (req,res) => {
    res.status(200).json({'mesaj': 'hoşgeldiniz'})
})

app.listen(3000, () => {
    console.log('server ayağa kalktı');
})