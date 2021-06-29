const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {users} = require('../../databases/models')

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

    async readUser (request, response) {
        const {user} = request.params
        try {
            const getUser = await users.findOne({where: {user}})
            return response.status(200).send(getUser)
        }
        catch (err) {
            return response.status(400).send({ error: 'Algo deu errado, tente novamente mais tarde' })
        }
    }

    async updateUser (request, response) {
        const {id} = request.params
        const {newPassword} = request.body

        try {
            const cryptoPassword = bcrypt.hash(newPassword, 6)
            const modernizePassword = await users.update({values: {password: cryptoPassword}, where:{id}})
            response.status(200).send({ msg: 'Senha alterada com sucesso!'})
        } catch (err) {
            response.status(400).send({ error: 'Algo deu errado, tente novamente mais tarde' })
        }
    }

    async updateProfileUser (request, response) {
        const {user} = request.params
        const {name, phone} = request.body

        try {
            const modernizeProfileUser = await users.update({name, phone},{where: {user}})
            return response.status(200).send({msg: 'Dados atualizados com sucesso'})
        }
        catch (err) {
            return response.status(400).send({error: 'Algo deu errado, tente novamente'})
        }
    }
}


module.exports = new UserControllers()