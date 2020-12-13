// Import Models
const Contact = require('../../models/Contact');

// Import Variables
const problems = ['Website', 'Teacher', 'User'];

// Import Functions
const sendResponse = require('../../Utils/sendResponse');

// createContact route handler
const createContact = async (req, res, next) => {
    try {
        const { email, problem, message } = req.body;
        console.log(email, problem, message)
        if(!email || !problems.includes(problem) || !message) {
            return sendResponse(res, 400, 'تأكد من سلامة جميع البيانات');
        }
        const contact = await new Contact(req.body).save();
        return sendResponse(res, 200, 'تم إرسال مشكلتك بنجاح إلى المسئول. شكرًا لتواصلك معنا', contact)
    } catch(err) {
        return sendResponse(res, 500, err.message);
    }
}

module.exports = createContact;