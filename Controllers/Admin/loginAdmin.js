// Import Packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// Account Login Controller
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            return sendResponse(res, 404, 'ذلك الحساب غير موجود');
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (admin && !passwordMatch) {
            return sendResponse(res, 401, 'الرقم السري خطأ');
        }
        if(admin && passwordMatch) {
            const token = jwt.sign({ _id: admin._id, role: admin.role }, process.env.JWT_KEY);
            const result = { token: token, admin: admin };
            return sendResponse(res, 200, 'تم الدخول بنجاح', result);
        }

    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}


// Export loginAdmin
module.exports = loginAdmin;