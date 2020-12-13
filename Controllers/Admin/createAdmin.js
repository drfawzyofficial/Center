// Import Packages
const bcrypt = require('bcryptjs');

// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// createAdmin method for creating a admin
const createAdmin = async (req, res) => {
    try {

        const data = req.body;
        const partner_founded = await Admin.findOne({ email: data.email });
        if (partner_founded) {
            return sendResponse(res, 409, 'ذلك الحساب موجود مُسبقًا');
        }

        data.password = await bcrypt.hash(req.body.password, 10);
        const partner = await new Admin(data).save();

        return sendResponse(res, 200, 'تم إنشاء الحساب بنجاح', partner);
    } catch (err) {
        console.log(err.message);
        return sendResponse(res, 500, 'حدث خطأ بالسيرفر');
    }

}

// Export createAdmin
module.exports = createAdmin;
