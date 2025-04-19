const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator'); // Import validationResult from express-validator
const mapService = require('../services/maps.service'); // Import mapService for geolocation and distance calculations
const {sendMessageToSocketId} = require('../socket'); // Import sendMessageToSocketId for sending messages to socket IDs
const rideModel = require('../models/ride.model'); // Import rideModel for database operations


 // createRide function to handle ride creation 

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        const pickupLocation = await mapService.getAddressCoordinates(pickup);
        console.log('Pickup Location:', pickupLocation);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupLocation.ltd,
            pickupLocation.lng,
            2
        );
        console.log('Captains in Radius:', captainsInRadius);

                ride.otp = " "

                // In createRide function:
                  const rideWithUser = await rideModel.findOne({ _id: ride._id })
                  .populate('user', 'fullname email socketId')
                  .select('+otp'); // Add this line to include OTP

        // Notify each captain in the radius about the new ride
        captainsInRadius.forEach(captain => {
            if (captain.socketId) {
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: rideWithUser
                });
            }
        });

        return res.status(201).json(ride);
    } catch (error) {
        console.error('Error creating ride:', error);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Failed to create ride' });
        }
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req); // validate the request using express-validator
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }); // send validation errors if any
    }

    const { pickup, destination } = req.query; // destructure the query parameters

    try{
        const fare = await rideService.getFare( pickup, destination ); // call the service to get fare
        res.status(200).json(fare); // send the fare as a JSON response
    }
    catch (error) {
        console.error("Error fetching fare:", error); // log the error
        res.status(500).json({ error: "Failed to fetch fare" }); // send an error response if something goes wrong
    }
}


// filepath: Backend/controllers/ride.controller.js
module.exports.confirmRide = async (req, res) => {
    const { rideId } = req.body;
    try {
        // Update ride with captain details
        await rideModel.findByIdAndUpdate(rideId, {
            captain: req.captain._id,
            status: 'accepted'
        });

        // Fetch the updated ride with populated fields and include OTP
        const updatedRide = await rideModel.findById(rideId)
            .populate('user', 'fullname email socketId')
            .populate('captain', 'fullname vehicle')
            .select('+otp'); // Add this line to include OTP

        // Send updated ride to user
        sendMessageToSocketId(updatedRide.user.socketId, {
            event: 'ride-confirmed',
            data: updatedRide
        });

        res.status(200).json(updatedRide);
    } catch (error) {
        console.error('Error confirming ride:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports.startRide = async (req, res) => {
    const { rideId, otp } = req.query;
    try {
        // Update ride status and validate OTP
        const ride = await rideModel.findOne({ _id: rideId }).select('+otp');
        
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        if (ride.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Update ride status
        const updatedRide = await rideModel.findByIdAndUpdate(
            rideId,
            { status: 'ongoing' },
            { new: true }
        ).populate('user').populate('captain');

        // Send to user via socket
        sendMessageToSocketId(updatedRide.user.socketId, {
            event: 'ride-started',
            data: updatedRide
        });

        return res.status(200).json(updatedRide);
    } catch (error) {
        console.error('Error starting ride:', error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}