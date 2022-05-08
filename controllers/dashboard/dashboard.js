const Media = require("../../models/mediaModel/media.model")
const Purchase = require("../../models/mediaModel/purchase.model")
const Thumbnail = require("../../models/mediaModel/thumbnail.model")
const Users = require("../../models/users/users.models")

exports.dashboard = async (req,res)=>{
    try{
        let totalMedia = await Media.countDocuments({})
        let totalUser = await Users.countDocuments({})
        let totalThumbnail = await Thumbnail.countDocuments({})
        let totalPurchase = await Purchase.countDocuments({})
        res.json({
            type:"success",
            msg:"Dashboard",
            data:{
                totalMedia,
                totalUser,
                totalThumbnail,
                totalPurchase
            }
        })
    }
    catch(err){
        res.json({
            type:"error",
            msg: err.message
        })
    }
}