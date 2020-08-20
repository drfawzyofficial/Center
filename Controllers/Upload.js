/*
 * This Controller includes the Upload Route Handlers and Business Logic
 * Here is the Upload Picture route handler
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

// Import Middlewares
const upload = require('../Middlewares/uploadPicture');

// uploadPicture router handler
const uploadPicture = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return sendResponse(res, 500, err.message, err.message);
            } else {
                if (req.file === undefined) {
                    return sendResponse(res, 400, 'No file is selected', 'No file is selected');
                } else {
                    await User.updateOne({ _id: req.user._id }, { avatar: req.file.filename });
                    const result = { avatarURL: `http://localhost:3000/assets/uploads/${ req.file.filename }` }
                    return sendResponse(res, 400, 'Photo is stored', 'Photo is uploaded successfully', result)
                }
            }
        })
    } catch(err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}


// Export all Upload Route Handles(uploadPicture, uploadPDF, uploadVideo)
module.exports = {
    uploadPicture
}
    