const path = require('path');
const fs = require('fs');

// var io = require('socket.io');
var express = require('express');
var http = require('http');
var sss = require('body-parser');
var axios = require('axios');
// var chokidar = require('chokidar');

var app = express();
var server = http.createServer(app);

// var io = new io.Server(server);

app.use(express.json());

app.use(express.static(path.resolve('./public')));

var r = process.env.TELEGRAM_ID || 482859236;
var BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "6328679940:AAEOSdtIktmsjfRN8OD0ODvp3U_G5P1krJs";

app.post('/contact', (req, res) => {

  var { name, subject, message } = req.body;

  var text = `Name: ${name};\n
  Subject: ${subject};\n
  Message:\n 
  ${message}`;

  console.log('Sending message: ', r);
  axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: r,
    text,
  })
  .then(response => {
    res.send('success');
  })
  .catch(error => {
    console.log('Sending Failed');
    res.status(500).send('null');
  });
});

var PORT = process.env.PORT || 12345;

server.listen(PORT, () => console.log('Server Started: '+PORT));
