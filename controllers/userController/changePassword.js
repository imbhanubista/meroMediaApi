 const bcrypt = require('bcrypt')

exports.changePassword = async(req,res)=>{
    let {password, nPassword, rPassword} = req.body
    try{
        let oldPassword = 
    }
    catch(err){
        res.json({
            type:"error",
            msg:err.message
        })
    }
}