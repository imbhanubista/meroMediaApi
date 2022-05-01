const Users = require('../../models/users/users.models')

// start of list users
exports.listUsers = async(req,res)=>{
    try{
        let allUsers = await Users.find({})
        res.json({
            type:"success",
            msg:"List of all users.",
            data:{
                allUsers
            }
        })
    }
    catch(err){
        res.json({
            type:'error',
            msg: err.message
        })
    }
}
// end of list user function

