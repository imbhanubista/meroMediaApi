const router = require("express").Router();
const {
  isLoggedIn,
  isAdmin,
} = require("../helpers/validator/jwtauthentication");
const auth = require("./auth");
const afterAuth = require("./afterAuth");
// before auth
router.use("/auth", auth);

// after authentication
router.use("/admin", isLoggedIn, isAdmin, afterAuth);

module.exports = router;
