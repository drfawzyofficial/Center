
// Import Packages
const bcrypt = require('bcryptjs');

// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// createAdmin method for creating a admin
const changePassword = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ _id: req.user._id });

        if(!admin) {
            return sendResponse(res, 404, 'هذا المسئول غير موجود');
        }
        
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword) {
            return sendResponse(res, 400, 'جميع الحقول إجبارية وكلمتا سر إجباري التطابق');
        }

       

        let passwordMatch = await bcrypt.compare(req.body.oldPassword, admin.password);

        if (!passwordMatch) {
            return sendResponse(res, 400, 'كلمة السر خاطئة');
        } else {
            await Admin.findByIdAndUpdate({ _id: admin._id }, { password: await bcrypt.hash(newPassword, 10) })
            return sendResponse(res, 200, 'تم تغيير كلمة المرور بنجاح');
        }

    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// Export createAdmin
module.exports = changePassword;



