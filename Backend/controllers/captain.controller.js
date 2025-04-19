const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); // Ensure jwt is imported
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.RegisterCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email: email.toLowerCase() });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = new captainModel({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email: email.toLowerCase(),
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });

    await captain.save();
    console.log('Registered captain:', captain);

    const token = captain.generateAuthToken();
    console.log('Generated token:', token);
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.status(201).json({ token, captain });
};

module.exports.LoginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel
        .findOne({ email: email.toLowerCase() })
        .select('+password');

    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await captain.comparePassword(password); // Use instance method

    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' }); // Ensure cookie settings
    res.status(200).json({ token, captain });
};

module.exports.GetCaptainProfile = (req, res, next) => {
    const captain = {
        _id: req.captain._id,
        fullname: req.captain.fullname,
        email: req.captain.email,
        vehicle: req.captain.vehicle
    };
    res.status(200).json(captain);
};

module.exports.LogoutCaptain = async (req, res, next) => { 
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    await blacklistTokenModel.create({ token });
    
    res.clearCookie('token');
    
    res.status(200).json({ message: 'Logged out successfully' });
} 