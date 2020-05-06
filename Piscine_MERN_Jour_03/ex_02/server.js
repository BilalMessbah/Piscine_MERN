const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27042';
const dbName = 'api';
const assert = require('assert');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));

MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    app.post('/register', function (req, res) {
        var UserSchema = new mongoose.Schema({
            login: {
                type: String,
                unique: true,
                required: true,
                trim: true
            },
            email: {
                type: String,
                unique: true,
                required: true,
                trim: true
            },
            password: {
                type: String,
                required: true,
            },
            type: {
                type: Boolean,
                required: true,
            }
        });
        var User = mongoose.model('users', UserSchema);
        module.exports = User;

        if (req.body.login &&
            req.body.email &&
            req.body.password) {

            var userData = {
                login: req.body.login,
                email: req.body.email,
                password: req.body.password,
            }

            //use schema.create to insert data into the db
            User.create(userData, function (err, user) {
                if (err) {
                    return err;
                } else {
                    return res.redirect('/register');
                }
            });
        }
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