/*
 * This Controller includes the User Router Handlers and Business Logic
 * Here is the User signup Controller
 * Here is the User Login Controller
*/


// Import Packages
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Import Models(User, Review, Course, Book)
const { User } = require('../models/Account');
const Review = require('../models/Review');
const Course = require('../models/Course');
const Book = require('../models/Book');

// Import Functions
const sendResponse = require('../Utils/sendResponse');



// The following exports respresnt list of middleware functions(Signup, Login)
module.exports = {
    Search: async (req, res, next) => {
        try {
            const courses = await Course.find({ coursename: { $regex: '.*' + req.query.key + '.*' } }).limit(5)
            if(courses.length > 0) {
                return sendResponse(res, 200, 'Finding Courses that match the key', 'Courses are gotten Successfully', courses)
            } else {
                return sendResponse(res, 404, 'courses <= 0', 'There are no courses that match the query')
            }
            
        } catch (err) {
            return sendResponse(res, 500, err.message, 'Something went wrong');
        }
    },
    getProfile: async (req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.user._id });
            return sendResponse(res, 200, 'Finding User Profile', 'Profile Data is Comming', { profile: user });
        } catch (err) {
            return sendResponse(res, 500, err.message, 'Something went wrong');
        }

    },
    getUsers: async (req, res, next) => {
        try {
            const Users = await User.aggregate([ { $match: { _id: {$ne: mongoose.Types.ObjectId(req.user._id)}, role: "User" } }, { $sample: { size:  20 } } ]);
            return sendResponse(res, 200, 'Finding User Data', 'User Data is Comming', { Users: Users });
        } catch (err) {
            return sendResponse(res, 500, err.message, 'Something went wrong');
        }

    },
    getInstructors: async (req, res, next) => {
        try {
            const Instructors = await User.aggregate([ { $match: { _id: {$ne: mongoose.Types.ObjectId(req.user._id) }, role: "Instructor" } }, { $sample: { size:  20 } } ])
            return sendResponse(res, 200, 'Finding Instructors Data', 'Instructors Data is Comming', { Instructors: Instructors });
        } catch (err) {
            return sendResponse(res, 500, err.message, 'Something went wrong');
        }

    },
    getCourses: async (req, res, next) => {
        try {
            const Courses = await Course.aggregate([  { $sample: { size:  20 } } ]);
            return sendResponse(res, 200, 'Finding User Profile', 'Profile Data is Comming', { Courses: Courses });
        } catch (err) {
            return sendResponse(res, 500, err.message, 'Something went wrong');
        }

    }
    
};