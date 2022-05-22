const Media = require("../../models/mediaModel/media.model")
const Purchase = require("../../models/mediaModel/purchase.model")
const stripe = require('stripe')(process.env.STRIPE_SECRET)


// start of purchase media 
exports.purchaseMedia = async(req,res)=>{
    let {id} = req.params
    let users = req.loggedInData
    let token = req.body.token
    // console.log(token,"I am here")
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
    try{
        let paymentGateway = await stripe.charges.create({
            amount: mediaId.price * 100,
            currency: "usd",
            source: token,
            description: "Purchase of media " + mediaId.title 
        })
        // console.log(paymentGateway);
        await new Purchase({
            user_id: users._id,
            product_id: mediaId._id,
            payment_info: paymentGateway.id

        }).save()
        res.json({
            type:"success",
            msg:"Successfully Purchased items!!!"
        })
    }
    catch(err){
        res.json({
            type:"error",
            msg:"Payment failed!"+ err.message
        })
    }
   
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
    
       let data = await Purchase.find({}).populate("product_id").populate("user_id", "name email")
        res.json({
            type:"succes",
            msg:"Total media purchased",
            data
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
            type:"success",
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


// show actual video after purchase
exports.detailAfterPurchase = async(req,res)=>{
    let userId = req.loggedInData
    let {id} = req.params
    try{
  let purchaseData = await Purchase.findOne({$and:[
     { user_id: userId._id},
     {_id:id}
  ]}).populate("product_id","-previewVideo -price -description -tag")

  if(purchaseData === null){
    res.json({
      type:"error",
      msg:"This user haven't buy this product"
    })
  }else{
    res.json({
        type:"success",
        msg:"Purchased Media",
        data: purchaseData
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
  
  // end of function that show actual video after purchase