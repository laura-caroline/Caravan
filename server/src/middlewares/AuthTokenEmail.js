const jwt = require('jsonwebtoken')
const secretKeyEmail = '@email'

const AuthTokenEmail = (request,response)=>{
    const headers = request.headers.authorization
    console.log(headers)
    const [,token] = headers.split(' ')
    return jwt.verify(token, secretKeyEmail , (err)=>{
        if(err){
            console.log('aqui')
            return response.json({token: false})
        }
        return response.json({token: true})
    })
}
module.exports = AuthTokenEmail, {secretKeyEmail}