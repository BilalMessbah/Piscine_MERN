var express = require('express')
var app = express();
var router = express.Router();

process.env.NODE_ENV = 'development';

var http = require('http');
var fs = require('fs');
nconf = require('nconf');

nconf.argv()
  .env()
  .file({ file: 'path/to/config.json' });

nconf.set('database:host', 'localhost');
nconf.set('database:port', 4242);

console.log('NODE_ENV: ' + nconf.get('NODE_ENV'));
console.log('database: ' + nconf.get('database'));

 app.get('/', function (req, res, next) {
   res.send('Bonjour, veuillez mettre un /name/:name');
 })

app.get('/name', function (req, res, next) {
  fs.readFile('index.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.write('unknown');
    return res.end();
  });
})

app.get('/name/:nom', function (req, res, next) {
  console.log(req.params.nom);
  var name = req.params.nom;
  fs.readFile('index.html', function (err, data) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.write(name);
    return res.end();
  });
});
app.listen(4242);
