// Import Models
const Partner = require('../../models/Partner');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// deletePartner Controller for delete a partner
const deletePartner = async (req, res) => {
    try {


        const partnerID = req.params.partnerID;
        const partner = await Partner.findOne({ _id: partnerID });
        if(!partner) {
            return sendResponse(res, 404, 'ذلك الشريك غير موجود للحذف');
        } else {
            const partner = await Partner.findByIdAndDelete({ _id: partnerID });
            return sendResponse(res, 200, 'تم حذف الشريك بنجاح', partner);
        }
      
        
    } catch (err) {
        console.log(err.message);
        return sendResponse(res, 500, 'حدث خطأ بالسيرفر');

    }
}

// Export deletePartner
module.exports = deletePartner;
