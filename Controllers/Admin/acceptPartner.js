// Import Models
const Partner = require('../../models/Partner');
const Admin = require('../../models/Admin');
// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// refusePartner Controller for refusing a partner with specefic (partnerID)
const acceptPartner = async (req, res, next) => {
    try {
        const admin = await Admin.findById({ _id: req.user._id });
        if(!admin) {
            return sendResponse(res, 404, 'لا يُوجد ذلك المسئول');
        } else {
            const partnerID = req.params.partnerID;
            const partner = await Partner.findByIdAndUpdate({ _id: partnerID }, { partnerApp: 'acceptedApp' }, { new: true });
            return sendResponse(res, 200, 'تم قبول الطلب', partner);
        }
       
    } catch (err) {
        return sendResponse(res, 500, err.message);

    }
}

// Export acceptPartner
module.exports = acceptPartner;
