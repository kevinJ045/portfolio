const path = require('path');
const fs = require('fs');

var io = require('socket.io');
var express = require('express');
var http = require('http');
var chokidar = require('chokidar');

var app = express();
var server = http.createServer(app);

var io = new io.Server(server);

app.use(express.static(path.resolve('./public')));

var watcher = chokidar.watch('./public', {});
io.on('connection', socket => {
  watcher
  .on('change', (p) => {
    var ext = path.extname(p);
    socket.emit('file:change', ext, p);
  });
});


server.listen(2344, () => console.log('Server Started: 2344'))

module.exports = {
  mode: 'production',
  
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },

  watch: true,
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    mangleExports: false
  }
}