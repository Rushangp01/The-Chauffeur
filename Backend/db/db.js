const mongoose = require('mongoose');
require('dotenv').config(); 
const mongodb = require('mongodb');

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT,)
        .then(() => {
            console.log('Connected to database');
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = connectToDb;