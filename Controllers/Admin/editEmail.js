// Import Models
const Admin = require('../../models/Admin');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// deletePartner Controller for delete a partner
const editEmail = async (req, res) => {
    try {

        const admin = await Admin.findOne({ _id: req.user._id });

        if(!admin) {
            return sendResponse(res, 404, 'هذا المسئول غير موجود');
        }

        const email = req.body.email;
        if (!email.match(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/)) {
            return sendResponse(res, 400, 'الحساب يجب أن يكون ياهر أو جيميل')
        }

        if(admin.email === email) {
            return sendResponse(res, 400, 'هذا هو حسابك الشخصي')
        }

        const foundedEmail = await Admin.findOne({ email: email });

        if(foundedEmail) {
            return sendResponse(res, 400, 'هناك مسئول آخر يمتلك ذلك الحساب')
        }

        
        await Admin.findByIdAndUpdate({ _id: req.user._id }, { email: email});

        return sendResponse(res, 200, 'تم تغيير الحساب بشكل كامل')

    } catch (err) {
        return sendResponse(res, 500, err.message, 'Something went wrong');

    }
}

// Export deletePartner
module.exports = editEmail;
