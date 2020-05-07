var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://127.0.0.1:27042/mern-pool";

MongoClient.connect(url, function(err, db) {
    if (err) {
        console.log("Connection failed");
    } 
        else {
            console.log("Connection successfull");
        }
});


const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27042';
const dbName = 'api';
const assert = require('assert');
var bodyParser = require('body-parser');

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    const db = client.db(dbName);
    app.use(bodyParser.urlencoded({extended: false}));
    app.post('/register', function(req, res){
        //console.log(req.body.user.login);
        var login = req.body.login;
        var email = req.body.email;
        var password = req.body.password;
        db.collection('membre').insertMany([req.body], function(err, r) {
            //delete req.body._id;
          assert.equal(null, err);
          assert.equal(2, r.insertedCount);
    
          //client.close();
        });
        res.send('Collection saved.\n' + JSON.stringify(req.body));
    })
});

app.set('view engine', 'ejs');

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/", (req, res) => {
    res.render("register");
})

app.listen("4242");



