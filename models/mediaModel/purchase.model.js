const mongoose = require('mongoose')
const Users = require('../users/users.models')
const Media = require('./media.model')

const purchaseSchema = mongoose.Schema({
    user_id: {type:String, ref:Users},
    product_id: {type:String , ref:Media},
    payment_info : String
})

const Purchase = mongoose.model("Purchase", purchaseSchema)

module.exports = Purchase