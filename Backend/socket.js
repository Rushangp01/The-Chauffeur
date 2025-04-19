const socketIo = require('socket.io');
const userModel = require('./models/user.model'); // Adjust the path as necessary
const captainModel = require('./models/captain.model'); // Adjust the path as necessary


let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);


        socket.on('join', async (data) => {
            const { userId, userType } = data;
           
            console.log(`User joined: ${userId}, Type: ${userType}`);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        // socket.io handler
socket.on('update-location-captain', async (data) => {
    const { userId, location } = data;

    console.log('Received update-location-captain:', { userId, location });

    if (!location || !location.ltd || !location.lng) {
        console.error('Invalid location data');
        return socket.emit('error', { message: 'Invalid location data' });
    }

    try {
        const updatedCaptain = await captainModel.findByIdAndUpdate(
            userId,
            {
                location: {
                    type: 'Point',
                    coordinates: [location.lng, location.ltd] // [lng, lat]
                }
            },
            { new: true }
        );
        console.log('Updated captain:', updatedCaptain ? updatedCaptain.location : 'Not found');
    } catch (error) {
        console.error('Error updating location:', error.message);
    }
});

        socket.on('disconnect', async () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    })
}



const sendMessageToSocketId = (socketId, messageObject) => {

console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };