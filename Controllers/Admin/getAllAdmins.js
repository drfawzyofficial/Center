// Import Packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// Account Login Controller
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        return sendResponse(res, 200, 'تم جلب جميع المسئولين بنجاح', admins);

    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}


// Export loginAdmin
module.exports = getAllAdmins;
