const express = require("express");
const router = express.Router();

// Include Partner Controllers
const { createAdmin, loginAdmin, getAllPartners, refusePartner, deletePartner, deleteAdmin, getAllAdmins, changePassword, editEmail, acceptPartner, getAllContacts, getAllFeedbacks  } = 
require("../Controllers/Admin/index");


// Include Middlewares
const { checkAuth, admin, adminRole } = require("../Middlewares/index");

router.post("/createAdmin", admin, createAdmin);

router.post("/loginAdmin", loginAdmin);

router.post("/acceptPartner/:partnerID", checkAuth, adminRole, acceptPartner);

router.post("/refusePartner/:partnerID", checkAuth, adminRole, refusePartner);

router.get("/getAllContacts", checkAuth, adminRole, getAllContacts);

router.get("/getAllFeedbacks", checkAuth, adminRole, getAllFeedbacks);

router.get("/getAllAdmins", checkAuth, adminRole, getAllAdmins);

router.patch("/changePassword", checkAuth, adminRole, changePassword);

router.patch("/editEmail", checkAuth, adminRole, editEmail);

router.delete("/deleteAdmin/", checkAuth, adminRole, deleteAdmin);

router.delete("/deletePartner/:partnerID", checkAuth, adminRole, deletePartner);

router.get("/getAllPartners", checkAuth, adminRole, getAllPartners);

router.patch("/refusePartner", checkAuth, adminRole, refusePartner);

module.exports = router;
