require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()


const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '2139d7a0',
  apiSecret: 'NUtqL5aRDryHG9wK'
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", 'Content-Type');
})

app.get('/', (req, res) => {
  console.log("hi there working")
  res.send("Alright working here")
})

// app.post('/sms', (req, res) => {
//   // Send SMS
//   nexmo.message.sendSms(
//     "+91 7582038031", req.body.toNumber, req.body.message, {type: 'unicode'},
//     (err, responseData) => {if (responseData) {console.log(responseData)}}
//   );
// });

app.post('/api/form', (req, res) => {
  res.send({hello:"world"})
  console.log(req.body)
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: 'tanaymainkar25@gmail.com', // sender address
    to: 'tanaymainkar25@gmail.com', // list of receivers
    subject: 'Registration successful', // Subject line
    html: '<h2>Aapka swagat hai</h2>'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
})

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

