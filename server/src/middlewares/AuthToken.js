const jwt = require("jsonwebtoken")
const secretKeyLogin = '@auth'

const AuthToken = (req,res)=>{
    const headers = req.headers.authorization
    const [,token] = headers.split(' ')
    
    return jwt.verify(token, secretKeyLogin,(err)=>{
        if(err){
            return res.json({token: false})
        }
        return res.json({token: true})
    })
}
module.exports = AuthToken

