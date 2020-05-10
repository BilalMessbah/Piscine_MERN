const session = require('express-session');
const sha1 = require('sha1');
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));


mongoose
    .connect("mongodb://127.0.0.1:27042/api", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB CONNECTION FAIL :", err));

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
        trim: true
    },
    type: {
        type: Boolean,
        required: true,
    }
});
app.post('/register', function (req, res) {

    var User = mongoose.model('users', UserSchema);
    let pwd = req.body.password;
    let hashedPass = sha1(pwd);
    //  module.exports = User;

    if (req.body.login && req.body.email && req.body.password && (req.body.password === req.body.verifPassword)) {
        console.log("test");
        var userData = new User({
            login: req.body.login,
            email: req.body.email,
            password: hashedPass,
            type: true,
        });
        User.findOne({ email: req.body.email }).exec((err, user) => {
            if (err) {
                console.log(err);
                res.status(400).render('errorRegister');
                return;
            }
            if (user) {
                console.log("user EXISTS");
                res.status(400).render('errorRegister');
                return;
            } else {
                console.log('user DOESNT exist');
                userData.save(function (err, user) {
                    if (err) {
                        console.log(err);
                        res.status(400).render('errorRegister');
                        return;
                    } else {
                        console.log('pas derreurs');
                        res.status(200).render('registered');
                        return;
                    }
                });
            }
        });
        console.log(userData);
    } else {
        console.log('les mots de passes ne sont pas identiques');
        res.status(400).render('errorRegister');
        return;
    }
    //  res.send('Collection saved.\n' + JSON.stringify(req.body));
})

app.use(session({
    name: 'cookie',
    secret: 'granolas',
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        maxAge: (1000 * 60 * 60) * 2 // 2h en millisecondes
    }
}))
app.post('/login', function (req, res) {
    var User = mongoose.model('users', UserSchema);
    console.log(req.body.emailLogin);
    User.findOne({ email: req.body.emailLogin, password: sha1(req.body.passwordLogin) }).exec((err, user) => {
        if (err) {
            console.log(err);
            res.status(400).render('errorLogin');
            return;
        }
        if (user) {
            console.log("user EXISTS");
            sess = req.session;
            sess.emailLogin = req.body.emailLogin;
            console.log(sess.emailLogin);
            res.status(200).render('logged', { "email": req.body.emailLogin });
            return;
        } else {
            console.log('user DOESNT exist');
            res.status(400).render('errorLogin');
            return;
        }
    });
});

app.set('view engine', 'ejs');

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/", (req, res) => {
    res.render("index");
})

app.listen("4242");