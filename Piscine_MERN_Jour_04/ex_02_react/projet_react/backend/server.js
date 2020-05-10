const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.ATLAS_URI;
var bodyParser = require('body-parser');
const registerRouter = require('./routes/register');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB CONNECTION FAIL :", err));


app.use('/register', registerRouter);

app.listen(port, () => {
    console.log('Le serveur est connecté sur le port 8000');
});