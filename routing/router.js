const router = require("express").Router();
const {
  isLoggedIn,
  isAdmin,
} = require("../helpers/validator/jwtauthentication");
const auth = require("./auth");
const afterAuth = require("./afterAuth");
const user = require('./user')
const { listMedia, userMediaList, detailMediaForUnauth } = require("../controllers/mediaController/media.controller");
// before auth
router.use("/auth", auth);

// after authentication
router.use("/admin", isLoggedIn, isAdmin, afterAuth);

// for authorized user
router.use('/user', isLoggedIn, user )





module.exports = router;
