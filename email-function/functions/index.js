const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();
//require("dotenv").config();

const SENDER_EMAIL = "cesquivelscursos@gmail.com";
const SENDER_PASSWORD = "unodos3!";

exports.sendMail = functions.database
  .ref("/tentatives/{userId}")
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
    authData
      .sendMail({
        from: SENDER_EMAIL,
        to: data.email,
        subject: "Your submission Info",
        text: "probando",
        html: "probando",
      })
      .then((res) => console.log("successfully sent that mail"))
      .catch((err) => console.log("error:", err));
  });
