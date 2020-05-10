const router = require('express').Router();
const express = require('express');
const app = express();
let User = require('../models/register.model');
const sha1 = require('sha1');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: lalalalaalla' + err));
});

router.route('/add').post((req, res) => {
    //const pwd = req.body.password;
    //let hashedPass = sha1(pwd);
    const login = req.body.login;
    const email = req.body.email;
    const password = req.body.password;
    const type = true;
    if (req.body.login && req.body.email && req.body.password && (req.body.password === req.body.verifPassword)) {
        const userData = new User({
            login,
            email,
            password,
            type,
        })
        userData.save()
            .then(() => res.json('User crée avec succès!'))
            .catch(err => res.status(400).json('Error iohiuluv ' + err));
    }
});
module.exports = router;