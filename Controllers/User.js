/*
 * This Controller includes the Account Router Handlers and Business Logic
 * Here is the Account signup Controller
 * Here is the Account Login Controller
 * Here is the Account changePassword Controller
 * Here is the Account EditProfile Controller
 * Here is the Account Logout Controller
 * Here is the Account RemoveUser Controller
*/

// Import Packages
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Import Models
const { User } = require('../models/Account');
const Review = require('../models/Review');
const Course = require('../models/Course');
const Book = require('../models/Book');

// Import Variables
const locations = ['Ismailia', 'Giza', 'Port Said'];
const genders = ['Male', 'Female'];

// Import Functions
const sendResponse = require('../Utils/sendResponse');


// Export all Account Router Handlers
module.exports = {
    Explore: async (req, res, next) => {
        try {
           const user = User.findById({ _id: req.user._id });
           if(user.role === "Instructor") {
            return sendResponse(res, 500, 'The Instructor is not allowed to visit this page', 'The Instructor is not allowed to visit this page');
           }
        } catch (err) {
            return sendResponse(res, 500, err.message, 'Something went wrong');
        }

    }

};
    