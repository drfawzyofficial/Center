const sendResponse = require('../Utils/sendResponse');
module.exports = (req, res, next) => {
    try {
        if(req.user.role === "admin") next();
        else sendResponse(res, 401, 'لست مسئؤلًا لكي تتم الصلاحية لك');
    } catch(err) {
        sendResponse(res, 401, 'التوكين غير صحيح');
    }
}