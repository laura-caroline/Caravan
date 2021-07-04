const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {users} = require('../databases/models')
const SendEmail = require('../utils/sendEmail')
const secretKeyEmail = '@email'

class UserControllers {
    async createUser (request, response) {
        const {
            name,
            cpf,
            phone,
            user,
            password,
            email
        } = request.body

        try {
            const checkExistsThisUser = await users.findOne({
                where: {
                    [Op.or]:[
                        {user},
                        {email}
                    ]
                }
            })

            if (!checkExistsThisUser) {
                const cryptoPassword = await bcrypt.hash(password, 6)
                const checkHierarchyAllUsers = await users.findOne({where: { hierarchy:'admin'}})
                const defineHierarchyUser = checkHierarchyAllUsers ? 'default' : 'admin'

                const generateUser = await users.create({
                    name,
                    cpf,
                    phone,
                    user,
                    email,
                    password: cryptoPassword,
                    hierarchy: defineHierarchyUser,
                })
                const token = jwt.sign({id: generateUser.id}, '@auth', {
                     expiresIn: 86400 
                })
                return response.status(200).send({
                    idUser: generateUser.id,
                    User: generateUser.user,
                    hierarchy: generateUser.hierarchy,
                    token 
                })
            }
            return response.status(400).send({ error: 'Esse usuário já existe, tente outro' })
        }
        catch (err) {
            return response.status(400).send({ error: 'Algo deu errado, tente novamente mais tarde' })
        }   
    }

    async authenticateUser (request, response) {
        const {user,password} = request.body
        console.log(request.body)
        try{
            const checkExistsUser = await users.findOne({where:{
                [Op.or]:[
                    {user},
                    {email:user}
                ]
            }})
            
            if(!checkExistsUser){
                return response.status(401).json({error: 'Usuário invalido'})
            }
            const compareHash = await bcrypt.compare(password, checkExistsUser.password)

            if(!compareHash){
                return response.status(401).send({error: 'Senha invalida'})
            }

            const generateToken = jwt.sign({id: checkExistsUser.id}, '@auth', {expiresIn: 86400})

            return response.status(200).send({ 
                idUser: checkExistsUser.id, 
                User: checkExistsUser.user, 
                hierarchy: checkExistsUser.hierarchy, 
                token: generateToken 
            })
        }
        catch(error){
            return response.status(404).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }

    }

    async authenticateEmail(req, res) {
        const { email } = req.body
        console.log(req.body)
        try {
            const checkExistsEmail = await users.findOne({ where: {email}})
            if(!checkExistsEmail){
                return res.status(203).send({error: 'Esse email não está cadastrado, tente outro' })
            }
            
            const token = jwt.sign({ email }, secretKeyEmail, { expiresIn: '1h' })
            const sendingEmail = new SendEmail(email, checkExistsEmail.id, token)
            console.log(sendingEmail)
            await sendingEmail.send()

            return res.status(200).send({validate: true, token})
            
        }
        catch (err) {
            return res.status(404).send({error: 'Algo deu errado, tente novamente mais tarde' })
        }
    }

}


module.exports = new UserControllers()