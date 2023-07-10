const router = require("express").Router();
const { login } = require("../controllers/auth");
const { Passport } = require("../middleware/auth");

router.get("/login", login);

router.get(
  "/auth/google",
  Passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  Passport.authenticate("google", {
    successRedirect: `/mail/user`,
    failureRedirect: "/login",
  })
);

module.exports = router;
