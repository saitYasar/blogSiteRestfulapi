// hatalar için middlewareler


const hataCatcher = (err, req, res ,next) => {


    if(err.code === 11000){
       return  res.json(
            {mesaj: Object.keys(err.keyValue)+" için girdiğiniz" +Object.values(err.keyValue)  + " daha önceden olduğu için eklenemez e güncellenemez",
            hataKodu : 400
        }
            
        )
    }
    if (err.code === 66) {
        return res.json ({
            mesaj: "değiştirilemez bir alanı güncellemeye çalıştınız ",
            hataKodu: 400
        })
        
    }
    res.status ( err.statusCode || 500 );
    ;
    res.json({
        hataKodu:err.statusCode || 500, // hata kodu varsa kullan yoksa 400 de geç.
        mesaj: err.message
    });
   
} 
// gelen error sayfasının içinde cast error varsa gecerli bir id girilmmeiş demektir.
// hataCatcher fonkksiyonunu dışa aktarıyoruz.

module.exports = hataCatcher;