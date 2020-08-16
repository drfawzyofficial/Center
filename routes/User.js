// Import Packages
const express = require('express');
const router = express.Router();

// Import Controllers
const User_Controller = require('../Controllers/User');


// Import Middlewares
const checkAuth = require('../Middlewares/checkAuth')


// All Routes that are related to User
router.get('/explore', checkAuth, User_Controller.Explore)


module.exports = router;