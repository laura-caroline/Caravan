const jwt = require("jsonwebtoken")
const APP_SECRET = '@email'
const {promisify} = require('util')


module.exports = async (request, response, next)=>{
    console.log('aqiemail')
    const authHeader = request.headers.authorization
    
    if(!authHeader){
        return response.status(401).json({error: 'Token not provided'})
    }

    const [, token] = authHeader.split(' ')

    try{
        const decoded = await promisify(jwt.verify)(token, APP_SECRET)
        request.userId = decoded.id
    }
    catch(err){
        return response.status(401).json({error: 'Token invalid'})
    }
    
    return next();
}
