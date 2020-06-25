const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

/**
 * Here we're using Gmail to send
 */
let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "cesquivelscursos@gmail.com",
    pass: "unodos3!",
  },
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = req.query.dest;
    const usuario = req.query.us;
    const articulo = req.query.art;
    const mailOptions = {
      from: "CoolBaby <yourgmailaccount@gmail.com>",
      to: dest,
      subject: "Compra", //
      html:
        `<p style="font-size: 16px;">Posible compra</p>
                <br />
                El usuario ` +
        usuario +
        ` quiere comprar el producto ` +
        articulo +
        `
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            `, // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
  });
});
