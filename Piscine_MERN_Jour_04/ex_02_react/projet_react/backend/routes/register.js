const router = require('express').Router();
let User = require('../models/register.model');
const sha1 = require('sha1');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    let pwd = req.body.password;
    let hashedPass = sha1(pwd);
    const login = req.body.login;
    const email = req.body.email;
    const password = hashedPass;

    const userData = new User({
        login,
        email,
        password,
        type: true,
    })

    userData.save()
        .then(() => res.json('User crée avec succès!'))
        .catch(err => res.status(400).json('Error ' + err));
});
module.exports = router;