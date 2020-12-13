// Require all Middlewares
const checkAuth = require('./checkAuth');
const partner = require('./partner');
const admin = require('./admin');
const adminRole = require('./adminRole');
const partnerRole = require('./partnerRole');
const userRole = require('./userRole');
const Upload = require('./Upload');
// Export all Middlewares
module.exports = { checkAuth, partner, admin, adminRole, partnerRole, userRole, Upload }