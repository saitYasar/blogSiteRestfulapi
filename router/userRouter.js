const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();

router.get('/' ,(req,res) => {
    res.json({mesaj:"tüm userlar listenecek"});
})
;
router.get('/:id' ,(req,res) => {
    res.json({mesaj:"idsi:" +req.params.id+" olan user listelenecek"});
})
;
router.post('/:id' ,(req,res) => {
    res.json({mesaj:"idsi:" +req.params.id+" olan user listelenecek"});
});
router.post('/' ,(req,res) => {
    res.json(req.body);
});
router.patch('/:id', (req,res) => {
    res.json({
        mesaj:"idsi:"+req.params.id+" olan kullanıcının güncellenecek bilgileri"
        +JSON.stringfy(req.body)+" bilgileri ile güncellenecek"})
});
router.delete('/:id', (req,res) => {
    res.json({
        mesaj:"idisiÇ:"+ req.params.id + "olan kullanıcı silinecek"})
});








module.exports = router;