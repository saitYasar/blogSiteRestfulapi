// hatalar için middlewareler


const hataCatcher = (err, req, res ,next) => {
    if(err.name === "CastError"){
        res.json({
            mesaj: "gecerli bir id veriniz",
        })
    } else {
        res.status(err.hataKodu).json({
            mesaj: err.message,
            hataKodu :err.statusCode
        });

    }
   
} 
// gelen error sayfasının içinde cast error varsa gecerli bir id girilmmeiş demektir.
// hataCatcher fonkksiyonunu dışa aktarıyoruz.

module.exports = hataCatcher;