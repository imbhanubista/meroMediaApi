const { purchaseMedia, listPurchase, individualPurchase } = require('../controllers/mediaController/purchase.controller')
const { searchMedia } = require('../controllers/mediaController/searchMedia')
const { changePassword } = require('../controllers/userController/changePassword')

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

module.exports = router