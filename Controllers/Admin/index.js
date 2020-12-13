// Require all Admin Controllers
const createAdmin = require('./createAdmin');
const loginAdmin = require('./loginAdmin');
const deleteAdmin = require('./deleteAdmin');
const getAllAdmins = require('./getAllAdmins');
const changePassword = require('./changePassword');
const deletePartner = require('./deletePartner');
const getAllPartners = require('./getAllPartners');
const refusePartner = require('./refusePartner');
const editEmail = require('./editEmail');
const acceptPartner = require('./acceptPartner');
const getAllContacts = require('./getAllContacts');
const getAllFeedbacks = require('./getAllFeedbacks');

// Export All Partner Controllers
module.exports = { createAdmin, loginAdmin, deletePartner, getAllPartners, refusePartner, deleteAdmin, getAllAdmins, changePassword, editEmail, acceptPartner, refusePartner, getAllContacts, getAllFeedbacks }