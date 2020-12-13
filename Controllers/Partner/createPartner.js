// Import Packages
const bcrypt = require('bcryptjs');

// Import Models
const Partner = require('../../models/Partner');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// createPartner method for creating a partner
const createPartner = async (req, res) => {
    try {

        const data = req.body;
        const partner_founded = await Partner.findOne({ email: data.email });
        if (partner_founded) {
            return sendResponse(res, 409, 'ذلك الحساب موجود مُسبقًا');
        }

        data.password = await bcrypt.hash(req.body.password, 10);
        console.log(data)
        const partner = await new Partner(data).save();

        return sendResponse(res, 200, 'تم إنشاء الحساب بنجاح', partner);
    } catch (err) {
        console.log(err.message);
        return sendResponse(res, 500, 'حدث خطأ بالسيرفر');
    }

}

// Export createPartner
module.exports = createPartner;
