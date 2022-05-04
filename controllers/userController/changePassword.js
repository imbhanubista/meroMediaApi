 const bcrypt = require('bcrypt')

exports.changePassword = async(req,res)=>{
    let {password, nPassword, rPassword} = req.body
    try{

    }
    catch(err){
        res.json({
            type:"error",
            msg:err.message
        })
    }
}