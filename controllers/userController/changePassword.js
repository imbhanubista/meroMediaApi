 const bcrypt = require('bcrypt')
const Users = require('../../models/users/users.models')

exports.changePassword = async(req,res)=>{
    let {password, nPassword, rPassword} = req.body
    let userId = req.loggedInData
    try{
        let oldPassword = await Users.findOne({_id:userId._id})
        if(!await bcrypt.compare(password, oldPassword.password)){
            res.json({
                type:"error",
                msg:"Old password doesn't matched!!!"
            })
        }
        else if(nPassword !== rPassword){
            res.json({
                type:"error",
                msg:"New password & Repeat password doesn't matched!!!"
            })
        }
        else{
            let changedPassword = await bcrypt.hash(nPassword,15)
            await Users.updateOne({_id:userId._id},{
                $set:{
                    password:changedPassword
                }
            })
            res.json({
                type:"success",
                msg:"Password has been changed"
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