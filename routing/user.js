const { purchaseMedia, listPurchase, individualPurchase } = require('../controllers/mediaController/purchase.controller')

const router = require('express').Router()

router.post('/media_purchase/:id', purchaseMedia)

// get purchase media list 
router.get('/total_purchase', listPurchase)

// individual user purchased data
router.get('/purchased', individualPurchase)


module.exports = router