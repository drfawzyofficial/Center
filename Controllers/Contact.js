/*
 * This Controller includes the Contact Route Handlers and Business Logic
 * Here is the Contact-US route handler
*/

// Import Packages
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Import Models
const Contact = require('../models/Contact');
const Feedback = require('../models/Feedback');

// Import Variables
const locations = ['Ismailia', 'Giza', 'Port Said'];
const problems = ['Website', 'Instructor', 'User'];

// Import Functions
const sendResponse = require('../Utils/sendResponse');


// contactUS route handler
const contactUS = async (req, res, next) => {
    try {
        const { email, problem, message } = req.body;
        if(!email || !problems.includes(problem) || !message) {
            return sendResponse(res, 400, 'Validation Error', 'Make sure that the sent data is correct');
        }
        await Contact({ email: email, problem: problem, message: message });
        return sendResponse(res, 200, 'Document has been saved successfully', 'Your Problem has been sent Successfully')
    } catch(err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}

// Feedback Route Handler
const feedbackUS = async (req, res, next) => {
    try {
        const { message, stars } = req.body;
        if(!message || stars < 1 || stars > 5) {
            return sendResponse(res, 400, 'Validation Error', 'Make sure that the sent data is correct');
        }
        await Feedback({ message: message, stars: stars });
        return sendResponse(res, 200, 'Document has been saved successfully', 'Your Feedback has been sent Successfully')
    } catch(err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}


// Export all Contact Route Handles(contactUS, uploadPDF, uploadVideo)
module.exports = {
    contactUS,
    feedbackUS
}
    