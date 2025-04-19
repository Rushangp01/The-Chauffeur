const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ fullname, email, password, vehicle, location = {} }) => {
    if (!fullname || !fullname.firstname || !email || !password || !vehicle) {
        throw new Error('Please provide all required fields');
    }

    const captain = new captainModel({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname || ''
        },
        email: email.toLowerCase(),
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    await captain.save(); // Ensure it is saved to MongoDB
    return captain;
};
