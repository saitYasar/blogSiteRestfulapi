const express = require('express');
require('./database/dataBase')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})) // bodyler parse olması için





app.get('/', (req,res) => {
    res.status(200).json({'mesaj': 'hoşgeldiniz'})
})

app.post('/', (req,res) => {
    res.status(200).json(req.body)
})
app.get('/:id', (req,res) => {
    res.status(200).json({'id':req.params.id});
})


app.listen(3000, () => {
    console.log('server ayağa kalktı');
})