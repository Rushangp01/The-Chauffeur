const express = require('express');
const router = express.Router();
const { body } = require('express-validator');  
const captainController = require('../controllers/captain.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'Auto']).withMessage('Vehicle type must be either motorcycle, car or Auto')
], (req, res, next) => {
    console.log('Received POST /register request');
    captainController.RegisterCaptain(req, res, next);
});

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], (req, res, next) => {
    console.log('Received POST /login request'); 
    captainController.LoginCaptain(req, res, next);
});

router.get('/logout', authMiddlewares.authCaptain, (req, res, next) => {
    console.log('Received POST /logout request');
    captainController.LogoutCaptain(req, res, next);
});

router.get('/profile', authMiddlewares.authCaptain, (req, res, next) => {
    console.log('Received GET /profile request');
    captainController.GetCaptainProfile(req, res, next);
});
module.exports = router;