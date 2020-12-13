// Import Models
const Feedback = require('../../models/Feedback');


// Import Functions
const sendResponse = require('../../Utils/sendResponse');


// Feedback Route Handler
const createFeedback = async (req, res) => {
    try {
        const { message, stars } = req.body;
        if(!message || stars < 1 || stars > 5) {
            return sendResponse(res, 400, 'تأكد من سلامة جميع البينات');
        }
        const feedback = await Feedback(req.body).save();
        return sendResponse(res, 200, 'تم إرسال الفيدباك بنجاح', feedback)
    } catch(err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');
    }
}

// Export createFeedback
module.exports = createFeedback;