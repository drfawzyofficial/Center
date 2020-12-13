const sendResponse = require('../Utils/sendResponse');
module.exports = (req, res, next) => {
    try {
        if(req.user.role === "user") next();
        else sendResponse(res, 401, 'لست مستخدمًا لكي تتم الصلاحية لك');
    } catch(err) {
        sendResponse(res, 401, 'التوكين غير صحيح');
    }
}