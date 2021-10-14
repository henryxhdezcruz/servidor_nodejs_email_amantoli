var express = require("express");
var nodemailer = require("nodemailer");
var part_1 = "<!DOCTYPE html><html lang='en'><head>    <meta charset='UTF-8'>    <meta http-equiv='X-UA-Compatible' content='IE=edge'>    <meta name='viewport' content='width=device-width, initial-scale=1.0'>    <title>Document</title></head><body>    <main style='font-family: century gothic;'>        <div style='padding: 20px; background-color: whitesmoke;'>            <div style='text-align: center; font-weight: bold; font-size: 55px;'>Amantoli</div>            <h2 style='text-align: center;'>Recuperación de contraseña</h4>            <div style='padding-left: 40px;'>                <p>Hola</p>                <p style='font-weight: bold;'>"
var part_2 = "</p>                <p>¿Olvidaste tu contraseña?</p>                <p>Recibimos una solicitud para restablecer la contraseña de su cuenta.</p>                <p>Para restablecer su contraseña inglese el siguiente código en la aplicación móvil Amantoli.</p>                 <p style='font-weight: bold; font-size: 35px;'>"
var part_3 = "</p>             </div>        </div>        <div style='padding: 20px; background-color:#404040;'>   "

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-email", function (req, res) {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "20181136@uthh.edu.mx",
            pass: "necnyrovquywfvvh",
        },
    });

    var mailOptions = {
        from: req.body.email,
        to: req.body.email,
        subject: "Amantoli app",
        text: "Recuperación de contraseña",
        html: part_1 + req.body.name + part_2  + req.body.code + part_3,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("mensaje no enviado");
            res.status(500).send(error.message);
        } else {
            console.log("mensaje enviado con éxito");
            console.log(req.body);
            res.status(200).jsonp(req.body)
        }
    })
});

app.listen(3000, () => {
    console.log("Servidor en -> http://localhost:3000");
});
