// Import Packages
const express = require('express');
const router = express.Router();

// Include Contact_Controller
const Contact_Controller = require('../Controllers/Contact');

// contactUS Router => Post to /contact/contactUS to execute this request
router.post('/contactUS', Contact_Controller.contactUS)

// feedback Router => Post to /contact/feedback to execute this request
router.post('/feedback', Contact_Controller.feedbackUS)

module.exports = router;