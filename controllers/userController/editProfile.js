const { validateEditProfile } = require("../../helpers/validator/authValidation")
const Users = require("../../models/users/users.models")

// start of edit button function
exports.editProfile = async(req,res)=>{
    let loggedUserDetail = req.loggedInData
    try{
        let userData = await Users.findOne({_id:loggedUserDetail._id})
        res.json({
            type:"success",
            msg:"Your details",
            data:userData
        })
    }
    catch(err){
        res.json({
            type:"error",
            msg:err.message
        })
    }

}
// end of edit button function

// update function
exports.updateProfile = async(req,res)=>{
    let {name,bio} = req.body
    let userId = req.loggedInData
    let validator = validateEditProfile.validate({
        name
    })
    let profileUrl = ""
    
    if (validator.error){
        res.json({
            type:"error",
            msg: validator.error.details[0].message
        })
    }
   
    else if(req.files && req.files.profile){
        let profilePath = "/images/profiles/"+ req.files.profile
        profileUrl = profilePath
        req.files.profile.mv("public"+profileUrl, (err)=>{})
    }
    else{
       let dbProfilePath = await Users.findOne({_id:userId._id})
       profileUrl = dbProfilePath.profile
    }
    try{
        await Users.updateOne({_id:userId._id},{
            $set:{
                name,
                bio,
                profile: profileUrl
            }
        })
        res.json({
            type:"error",
            msg:"Profile updated !!!"
        })
    }
    catch(err){
        res.json({
            type:"error",
            msg: err.message
        })
    }
}


// end of update function