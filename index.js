const express = require('express');
require('./database/dataBase')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))





app.get('/', (req,res) => {
    res.status(200).json({'mesaj': 'hoşgeldiniz'})
})

app.post('/', (req,res) => {
    res.status(200).json(req.body)
})


app.listen(3000, () => {
    console.log('server ayağa kalktı');
})