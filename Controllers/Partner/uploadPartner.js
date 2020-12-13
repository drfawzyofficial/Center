// Import Packages
const path = require('path');
// Import Models
const Partner = require('../../models/Partner');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// Account Login Controller
const uploadPartner = async (req, res, next) => {
    try {

        if (req.file === undefined) {
            return sendResponse(res, 402, 'لم يتم إختيار أي ملف');
          } 

        const ext = path.extname(req.file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.GIF' && ext !== '.JPEG') {
             return sendResponse(res, 404, 'هذا النوع من الملف غير دعوم');
        }

        if (req.file.size > 1024 * 1024) {
            return sendResponse(res, 404, 'مساحة الملف كبيرة');
          } 

        const partner = await Partner.findByIdAndUpdate({ _id: req.user._id }, { avatar: `http://localhost:3000/assets/uploads/${ req.file.filename }`}, { new: true });
          
        return sendResponse(res, 200, 'تم رفع الصورة بنجاح', partner);

    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}


// Export Login Router
module.exports = uploadPartner;

