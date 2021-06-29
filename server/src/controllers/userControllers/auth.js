const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const { users } = require('../../databases/models')
const { secretKeyEmail } = require('../../middlewares/AuthTokenEmail')
const SendEmail = require('../../utils/sendEmail')

class AuthenticateControllers{
    async authenticateUser (request, response) {
        console.log(request.body)
        const {user,password} = request.body
        try {
            const checkExistsUser = await users.findOne({where:{[Op.or]:[{user},{email:user}]}})
            if (checkExistsUser) {
                const checkPassword = await bcrypt.compare(password, checkExistsUser.password)
                if (checkPassword) {
                    const {id,user,hierarchy} = checkExistsUser
                    const generateToken = jwt.sign({id}, '@auth', {expiresIn: 86400})
                    return response.status(200).send({ idUser: id, User: user, hierarchy, token: generateToken })
                }
                return response.status(203).send({msg: 'Senha inválida'})
            }
            return response.status(203).send({msg: 'Usuário ou senha inválida'})
        }
        catch (err) {
            return response.status(404).send({msg: 'Não conseguimos retornar seu usuário'})
        }
    }
    async authenticateEmail(req, res) {
        const { email } = req.body
        try {
            const checkExistsEmail = await users.findOne({ 
                where: {
                     email
                }
            })
            if (checkExistsEmail) {
                const token = jwt.sign({ email }, secretKeyEmail, { expiresIn: '1h' })
                const sendingEmail = new SendEmail(email, checkExistsEmail.id, token)
                await sendingEmail.send()

                return res.status(200).send({validate: true, token})
            }
            return res.status(203).send({error: 'Esse email não está cadastrado, tente outro' })
        }
        catch (err) {
            return res.status(404).send({error: 'Algo deu errado, tente novamente mais tarde' })
        }
    }
}


module.exports = new AuthenticateControllers()
