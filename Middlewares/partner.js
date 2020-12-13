const validator = require('../Utils/validation');

const partner = (req, res, next) => {
    const validationRule = {
        "fullname": "required|string",
        "email": "required|email",
        "password": "required|string|min:6|confirmed",
        "phone": "required|string|min:6",
        "location": "required|string",
        "gender": "string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    statusCode: 412,
                    message: err,
                    result: null
                });
        } else {
            next();
        }
    });
}

module.exports = partner;