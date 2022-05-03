const router = require("express").Router();
const {
  isLoggedIn,
  isAdmin,
} = require("../helpers/validator/jwtauthentication");
const auth = require("./auth");
const afterAuth = require("./afterAuth");
const { listMedia } = require("../controllers/mediaController/media.controller");
// before auth
router.use("/auth", auth);

// after authentication
router.use("/admin", isLoggedIn, isAdmin, afterAuth);

router.get('/user/medialist', listMedia)

module.exports = router;
