const jwt = require("jsonwebtoken")
const APP_SECRET = '@auth'
const {promisify} = require('util')


module.exports = async (request, response)=>{
    const authHeader = request.headers.authorization
    if(!authHeader){
        return response.status(401).json({error: 'Token not provided'})
    }
    const [, token] = authHeader.split(' ')
    try{
        const decoded = await promisify(jwt.verify)(token, APP_SECRET)
        response.status(200).send({token: true})
    }
    catch(err){
        response.status(401).json({error: 'Token invalid'})
    }
    
}
