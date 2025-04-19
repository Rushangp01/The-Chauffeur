const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator'); // Import validationResult from express-validator

module.exports.getCoordinates = async (req, res) => {
   
   const errors = validationResult(req); // Validate the request using express-validator
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Send validation errors if any
    }
   
    const { address } = req.query; // Get the address from the query parameters
    
    try {
        const coordinates = await mapService.getAddressCoordinates(address); // Call the service to get coordinates
        res.status(200).json(coordinates); // Send the coordinates as a JSON response
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        res.status(404).json({ error: "Failed to fetch coordinates" }); // Send an error response if something goes wrong
    }
}

module.exports.getDistanceTime = async (req, res) => {
    console.log('Raw Query Parameters:', req.query); // Log the raw query parameters

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation Errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;
    console.log('Origin:', origin);
    console.log('Destination:', destination);

    try {
        const result = await mapService.getDistanceAndTime(origin, destination);
        res.json(result);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;
    console.log('Input:', input);

    try {
        const suggestions = await mapService.getAddressSuggestions(input);
        res.json(suggestions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}