const experes = require("express");
const router = experes.Router();
const {body, query} = require('express-validator')
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middlewares')

router.post('/create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location must be at least 3 characters long'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters long'),
    body('vehicleType')
        .isString()
        .customSanitizer(value => value.toLowerCase()) // Convert to lowercase
        .isIn(['motorcycle', 'car', 'auto']).withMessage('Vehicle type must be one of the following: motorcycle, car, auto'),
    rideController.createRide
);

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Pickup location must be at least 3 characters long'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters long'),
    rideController.getFare 
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isString().withMessage('Ride ID is required'),
    body('otp').isString().isLength({ min: 4 }).withMessage('OTP must be at least 4 characters long'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isString().withMessage('Ride ID is required'),
    query('otp').isString().isLength({ min: 4 }).withMessage('OTP must be at least 4 characters long'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isString().withMessage('Ride ID is required'),
    rideController.endRide
)

module.exports = router;