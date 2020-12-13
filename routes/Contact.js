const express = require("express");
const router = express.Router();

// Include Contact Controllers
const { createContact   , createFeedback } = 
require("../Controllers/Contact/index");


// Include Middlewares

router.post("/createContact", createContact);
router.post("/createFeedback", createFeedback);

module.exports = router;
