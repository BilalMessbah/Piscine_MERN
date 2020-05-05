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