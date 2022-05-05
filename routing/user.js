const { editMedia } = require('../controllers/mediaController/media.controller')
const { purchaseMedia, listPurchase, individualPurchase } = require('../controllers/mediaController/purchase.controller')
const { searchMedia } = require('../controllers/mediaController/searchMedia')
const { changePassword } = require('../controllers/userController/changePassword')
const { updateProfile, editProfile } = require('../controllers/userController/editProfile')

const router = require('express').Router()

router.post('/media_purchase/:id', purchaseMedia)

// get purchase media list 
router.get('/total_purchase', listPurchase)

// individual user purchased data
router.get('/purchased', individualPurchase)

// search data
router.post('/search', searchMedia)

// password changed
router.post('/change_password', changePassword)

// update profile
router.post('/update_profile', updateProfile)

// edit profile
router.get('/edit_profile', editProfile)

module.exports = router