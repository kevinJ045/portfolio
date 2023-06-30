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

var r = process.env.TELEGRAM_ID;
var BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

app.post('/contact', (req, res) => {

  var { name, subject, message } = req.body;

  var text = `Name: ${name};\n
  Subject: ${subject};\n
  Message:\n 
  ${message}`
  axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: r,
    text,
  })
  .then(response => {
    res.send('success');
  })
  .catch(error => {
    res.status(500).send('null');
  });
});

// var watcher = chokidar.watch('./public', {});
// io.on('connection', socket => {
//   watcher
//   .on('change', (p) => {
//     var ext = path.extname(p);
//     socket.emit('file:change', ext, p);
//   });
// });


server.listen(process.env.PORT || 12345, () => console.log('Server Started: 12345'))
