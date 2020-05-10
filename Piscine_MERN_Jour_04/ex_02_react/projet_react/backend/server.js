const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB CONNECTION FAIL :", err));



app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log('Le serveur est connecté sur le port 8000');
});