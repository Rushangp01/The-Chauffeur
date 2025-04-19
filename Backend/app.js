const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();  
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');  
const captainRoutes = require('./routes/captain.routes'); 
const mapRoutes = require('./routes/maps.routes'); 
const rideRoutes = require('./routes/ride.routes');


connectToDb();
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/user', (req, res, next) => {
    console.log('Received request to /user');
    next();
}, userRoutes);

app.use('/captain', (req, res, next) => {
    console.log('Received request to /captain');
    next();
}, captainRoutes); 

app.use('/maps', (req, res, next) => {
    console.log('Received request to /maps');
    next();
}, mapRoutes);

app.use('/rides', (req, res, next) => {
    console.log('Received request to /ride');
    next();
}, rideRoutes);

module.exports = app;