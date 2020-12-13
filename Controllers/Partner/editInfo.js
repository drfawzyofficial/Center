// Import Models
const Partner = require('../../models/Partner');

// Import Utils 
const sendResponse = require('../../Utils/sendResponse');

// Account Login Controller


const editInfo = async (req, res) => {
    try {

        console.log(req.body);
        
        const { fullname, email, bio, location, gender, phone } = req.body;
      
        if (fullname.length < 6 || !email.match(/^\w+([-+.]\w+)*@((yahoo|gmail)\.com)$/) || bio.length < 25 || !(phone.length == 11)) {
            return sendResponse(res, 400, 'تأكد من سلامة جميع البيانات')
        }

        let anotherUser = await Partner.findOne({ _id: { $ne: req.user._id }, email: email })
        if (anotherUser) {
            return sendResponse(res, 409, 'شريك آخر يمتلك ذلك الحسابي');
        }

        const partner = await Partner.findByIdAndUpdate({ _id: req.user._id }, { fullname: fullname, email: email,  phone: phone,  location: location, gender: gender }, { new: true });

        return sendResponse(res, 200, 'تم تعديل جميع البيانات بشكل صحيح', partner);


    } catch (err) {
        return sendResponse(res, 500, err.message);

    }
}


// Export editProfile
module.exports = editInfo;

