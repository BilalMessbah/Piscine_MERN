const express = require('express')
const app = express()
var http = require('http');
var fs = require('fs');
var mongodb = require('mongodb');

var dbConn = mongodb.MongoClient.connect('mongodb://127.0.0.1:27042');

http.createServer(function (req, res) {
fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
});
}).listen(4242);

app.post('/post', function (req, res) {
    dbConn.then(function(db) {
        db.collection('students').insertOne(req.body);
    });    
    res.send('Collection saved.\n' + JSON.stringify(req.body));
});