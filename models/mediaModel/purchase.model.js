const mongoose = require('mongoose')
const Media = require('./media.model')

const purchaseSchema = mongoose.Schema({
    user_id: String,
    product_id: {type:String , ref:Media}
})

const Purchase = mongoose.model("Purchase", purchaseSchema)

module.exports = Purchase