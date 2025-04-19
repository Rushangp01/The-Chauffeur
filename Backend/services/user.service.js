const userModel = require('../models/user.model');

module.exports.registerUser = async ({
    firstname, email, password, lastname
}) => {
    if(!firstname || !email || !password){
        throw new Error('Please provide all required fields');
    }   
    const user = new userModel({
        fullname:{
            firstname,
            lastname
        },
        email: email.toLowerCase(),
        password
    });
  
    return user; 
}

