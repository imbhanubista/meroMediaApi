 const bcrypt = require('bcrypt')
const mail = require('../../helpers/mailHelper/mail.helper')
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
        // else if(await bcrypt.compare(oldPassword.password , nPassword)){
        //     res.json({
        //         type:"error",
        //         msg:"Old password and new password can't be same."
        //     })
        // }
        else if(nPassword !== rPassword){
            res.json({
                type:"error",
                msg:"New password & Repeat password doesn't matched!!!"
            })
        }
        else{
            let changedPassword = await bcrypt.hash(nPassword,15)
            mail(userId.email, "Password Changed Alert!!!", "<h4>Someone has changed your password</h4>")
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