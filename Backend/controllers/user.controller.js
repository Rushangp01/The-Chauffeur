const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log('Register request body:', req.body);

        const { fullname, email, password } = req.body;

        const isUserAlreadyExist = await userModel.findOne({ email: email.toLowerCase() });
        if (isUserAlreadyExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashPassword = await userModel.hashPassword(password);
        console.log('Hashed password:', hashPassword);

        // Create user
        const user = new userModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email: email.toLowerCase(), // Ensure email is stored in lowercase
            password: hashPassword,
        });

        await user.save(); // Save the user
        console.log('Registered user:', user);

        // Generate token
        const token = user.generateAuthToken();
        console.log('Generated token:', token);
        res.cookie('token', token);
        

        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Login request body:', req.body);

    try {
        // Case-insensitive email search and select password field
        const user = await userModel.findOne({ email: email.toLowerCase() }).select('+password');
        console.log('Queried user:', user);

        if (!user) {
            console.log('User not found:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Incorrect password for user:', email);
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate token
        const token = user.generateAuthToken();
        console.log('Generated token for user:', email);
        res.cookie('token', token);

        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res, next) => {
   res.clearCookie('token');
   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
   res.status(200).json({ message: 'Logged out' });
}