const mongoose = require('mongoose')

const purchaseSchema = mongoose.Schema({
    user_id: String,
    product_id: String
})

const Purchase = mongoose.model("Purchase", purchaseSchema)

module.exports = Purchase