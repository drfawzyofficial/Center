const validator = require('../Utils/validation');

const admin = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6|confirmed",
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

module.exports = admin;