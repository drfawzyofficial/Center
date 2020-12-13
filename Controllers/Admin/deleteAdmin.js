// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// deletePartner Controller for delete a partner
const deleteAdmin = async (req, res, next) => {
    try {

         const admin = await Admin.findByIdAndDelete({ _id: req.user._id });
         return sendResponse(res, 200, 'تم حذف المسئول بنجاح', admin);
        
    } catch (err) {
        console.log(err.message);
        return sendResponse(res, 500, 'حدث خطأ بالسيرفر');  

    }
}

// Export deletePartner
module.exports = deleteAdmin;
