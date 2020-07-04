const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
require('dotenv').config();

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/concert-promo', (req, res) => {
  res.header('Content-Type', 'application/json');
  let date = new Date();
  let current_hour = date.getHours();
  if (current_hour < 12){
    msgbody = 'Good morning! Your promocode is AM123'
  } else {
    msgbody = 'Hello! Your promocode is PM465'
  }
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.phone,
      body: msgbody
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
process.on('uncaughtException', function (err) {
  console.log(err);
}); 