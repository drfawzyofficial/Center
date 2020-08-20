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

// All User Route Handlers
const Explore = async (req, res, next) => {
      try {

        // Fetch the user data from mongoDB
        const user = await User.findById({ _id: req.user._id });

        // If the Instructor wants to visit the Explore Page that's related to User
        if(user.role === "Instructor") {
         return sendResponse(res, 500, 'The Instructor is not allowed to visit this page', 'The Instructor is not allowed to visit this page');
        }

        // When the User visits the Explore Page, We'll show all related courses based on his tags
        const relatedCourses = await Course.find({ coursename: { $in: user.tags } })
        const pageCount = Math.ceil(relatedCourses.length / 9)
        let pageNo = parseInt(req.query.pageNo)
        if (!pageNo || pageNo < 0) { pageNo = 1 }
        if (pageNo > pageCount) {
          pageNo = pageCount
        }
        const courses = relatedCourses.slice(pageNo * 9 - 9, pageNo * 9)
        const result = { pageCount: pageCount, pageNo: pageNo, courses: courses }
        return sendResponse(res, 200, 'Everything is Okay!', 'Results are found', result);

      } catch(err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
      } 
}


// Export all Account Router Handlers
module.exports = {
    Explore
};
    