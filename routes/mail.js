const router = require("express").Router();
const { readEmails, getUser } = require("../controllers/mail");
const { checkAuthenticated } = require("../middleware/auth");

router.get("/user", checkAuthenticated, readEmails);
router.get("/user-details", checkAuthenticated, getUser);

module.exports = router;
