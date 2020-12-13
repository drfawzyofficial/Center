// Import Packages
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import Models
const Partner = require('../../models/Partner');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// Account Login Controller
const loginPartner = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const partner = await Partner.findOne({ email: email });

        if (!partner) {
            return sendResponse(res, 404, 'ذلك الحساب غير موجود');
        }

        const passwordMatch = await bcrypt.compare(password, partner.password);
        if (partner && !passwordMatch) {
            return sendResponse(res, 401, 'الرقم السري خطأ');
        }
        if(partner && passwordMatch) {
            if(partner.partnerApp === 'underApp')  return sendResponse(res, 200, 'ذلك الطلب تحت المراجعة');

             if(partner.partnerApp === 'refusedApp')  return sendResponse(res, 200, 'تم رفض الطلب قم يإرسال طلب آخر');
             if(partner.partnerApp === 'acceptedApp')  {
                const token = jwt.sign({ _id: partner._id, role: partner.role }, process.env.JWT_KEY);
                const result = { token: token, partner: partner };
                return sendResponse(res, 200, 'تم الدخول بنجاح', result);
            }
        }

    } catch (err) {
        return sendResponse(res, 500, err.message);
    }
}


// Export Login Router
module.exports = loginPartner;

