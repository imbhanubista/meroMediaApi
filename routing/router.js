const router = require("express").Router();
const {
  isLoggedIn,
  isAdmin,
} = require("../helpers/validator/jwtauthentication");
const auth = require("./auth");
const afterAuth = require("./afterAuth");
const user = require('./user')
const { listMedia } = require("../controllers/mediaController/media.controller");
// before auth
router.use("/auth", auth);

// after authentication
router.use("/admin", isLoggedIn, isAdmin, afterAuth);

// for authorized user
router.use('/user', isLoggedIn, user )

// for unauthorized user 
router.get('/user/medialist', listMedia)  

module.exports = router;
