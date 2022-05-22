const Media = require("../../models/mediaModel/media.model")

exports.searchMedia = async(req,res)=>{
    let {title} = req.body
// console.log(title)
    try{
        let searchedData = await Media.find({$text: {$search :title}})
        res.json({
            type:"success",
            msg:"Your searched data !!",
            data: searchedData
        })
    }
    catch(err){
        res.json({
            type:"error",
            msg: err.message
        })
    }
}