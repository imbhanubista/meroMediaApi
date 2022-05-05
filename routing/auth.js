const { userMediaList, detailMediaForUnauth } = require("../controllers/mediaController/media.controller");
const { forgetPass } = require("../controllers/users/forgetPass.controller");
const { login } = require("../controllers/users/login.controller");
const { resetPass } = require("../controllers/users/reset.controller");
const { signup } = require("../controllers/users/signup.controller");
const router = require("express").Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/forget", forgetPass);
router.post("/reset", resetPass);
// for unauthorized user 
router.get('/user/medialist', userMediaList)  

// to get detail data 
router.get('/user/detailData', detailMediaForUnauth)

module.exports = router;
