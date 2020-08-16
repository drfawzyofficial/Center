const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Course = require('../models/Course');
const Book = require('../models/Book');
const { check, validationResult } = require('express-validator');
const Review = require('../models/Review');




router.post('/changeSpecialization', async (req, res, next) => {
    User.findByIdAndUpdate({ _id: req.user.id }, { specialized: req.body.field })
        .then((user) => {
            console.log(`${user.fullname} Password has been changes successfully`);
            req.flash("success", "Field has been updated successfully");
            res.redirect("/settings");
        })
        .catch((err) => {
            console.log(err.message);
            req.flash('error', 'Something went wrong');
            res.redirect('/settings');
        })
        .finally(() => "Code is written with Love");
});



module.exports = router;