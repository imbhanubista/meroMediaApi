const Media = require("../../models/mediaModel/media.model")
const Purchase = require("../../models/mediaModel/purchase.model")


// start of purchase media 
exports.purchaseMedia = async(req,res)=>{
    let {id} = req.params
    let users = req.loggedInData
    console.log(users)
    try{
let mediaId = await Media.findOne({_id:id})
let userId = await Purchase.findOne({
    $and:[
       { user_id : users._id},
       {product_id: mediaId._id }
    ]
})
if(mediaId === null){
    res.json({
        type:"error",
        msg:"Media doesn't exist!!!"
    })
}
else if(userId !==null){
    res.json({
        type:"error",
        msg:"You have already purchased this item!!!"
    })
}

else{
    await new Purchase({
        user_id: users._id,
        product_id: mediaId._id
    }).save()
    res.json({
        type:"success",
        msg:"Successfully Purchased items!!!"
    })
}
    }
    
    catch(err){
        res.json({
            type:"error",
            msg:err.message
        })
    }
}

// end of purchase media

// start of purchase list
exports.listPurchase = async(req,res)=>{
    try{
       let data = await Purchase.find({})
        res.json({
            type:"succes",
            msg:"Total media purchased"
        })
    }
    catch(err){
        res.json({
            type:"error",
            msg: err.message
        })
    }
}
// end of purchase list

// start of listing purchased item to particular user

exports.individualPurchase = async(req,res)=>{
    let userId = req.loggedInData
    try{
        // to find purchased media according to userId
        let mediaPurchased = await Purchase.find({user_id: userId._id}).populate("product_id")
        res.json({
            type:"error",
            msg:"List of media you have purchased",
            data: mediaPurchased
        })
    }
    catch(err){
        res.json({
            type:"error",
            msg:err.message
        })
    }
}

// end of individual purchase item
