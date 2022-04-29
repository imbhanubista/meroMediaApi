const jwt = require('jsonwebtoken')

exports.isLoggedIn = async(req,res,next)=>{
    let token = req.headers.authorization
    if(!token || token === "" || token.length<1){
        res.json({
            type : "error",
            msg : "Invalid token format"
        })
    }
    else{
        token = token.split(" ")
        let actualToken = token[1]
        if(!actualToken || actualToken === "" ||  actualToken.length<1){
            res.json({
                type : "error",
                msg : "Token not sent!"
            })
        }
        else{
            try{
                let verifiedData = jwt.verify(actualToken,process.env.JWT_SECRET)
                req.loggedInData  = verifiedData
                next()

            }
            catch(e){
                res.json({
                    type : "error",
                    msg : "Invalid token details"
                })
            }
        }

    }
}

exports.isAdmin = async (req,res,next)=>{
    if(req.loggedInData.isAdmin){
        next()
    }
    else{
        res.json({
            type : "error",
            msg : "Only available for admins"
        })
    }
}