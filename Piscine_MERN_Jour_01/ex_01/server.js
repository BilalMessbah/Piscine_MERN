const express = require('express')
const app = express()

process.env.NODE_ENV = 'development';

nconf = require('nconf');


//
// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
//
nconf.argv()
 .env()
 .file({ file: 'path/to/config.json' });

//
// Set a few variables on `nconf`.
//
nconf.set('database:host', 'localhost');
nconf.set('database:port', 4242);

//
// Get the entire database object from nconf. This will output
// { host: '127.0.0.1', port: 5984 }
//
console.log('foo: ' + nconf.get('foo'));
console.log('NODE_ENV: ' + nconf.get('NODE_ENV'));
console.log('database: ' + nconf.get('database'));

//
// Save the configuration object to disk
//

//console.log('NODE_ENV');

app.get('/', function (req, res) {
  res.send('poulet ! Ca marche !')
})

app.listen(4242, function () {
  console.log('Le serveur se lance sur le port 4242 !')
})