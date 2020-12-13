// Import Models
const Feedback = require('../../models/Feedback');
const Admin = require('../../models/Admin');
// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// getAllPartners Controller for getting all the partners
const getAllFeedbacks = async (req, res) => {
    try {
        const admin = await Admin.findById({ _id: req.user._id });
        if(!admin) {
            return sendResponse(res, 200, 'ذلك المسئول غير موجود');
        } else {
            const feedbacks = await Feedback.find({  });
            return sendResponse(res, 200, 'تم جلب جميع بيانات التواصل بشكل صحيح', feedbacks);
        }
      
    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}

// Export getAllPartners
module.exports = getAllFeedbacks;
