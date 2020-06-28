const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();
//require("dotenv").config();

const SENDER_EMAIL = "cesquivelscursos@gmail.com";
const SENDER_PASSWORD = "unodos3!";

exports.sendMail = functions.database
  .ref("/tentatives/{userId}/{generatedId}")
  .onCreate((snap, ctx) => {
    const data = snap.val();
    console.log("data:", data);
    let authData = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
    });
    let htmlText = `<div>
                  El usuario <strong>${data.nombreComprador}</strong> quiere comprar el articulo <strong>${data.nombreProducto}</strong>
                <div>
                <div>
                  <img src=${data.img} alt="Imagen articulo" />
                </div>
                <div>
                  <a href="https://cool-baby-d79c2.web.app/product-detail/${data.nombreVendedor}/${data.uidProducto}">${data.nombreProducto}</a>
                </div>`;

    //<img [src]="this.productoActual.img" alt="Imagen articulo" />
    authData
      .sendMail({
        from: SENDER_EMAIL,
        to: data.emailVendedor,
        subject: "Cool Baby",
        text: "test",
        html: htmlText,
      })
      .then((res) => console.log("successfully sent that mail"))
      .catch((err) => console.log("error:", err));
  });
