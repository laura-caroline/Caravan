const { Op } = require('sequelize')
const { parse } = require('date-fns')
const {getHourDate} = require('../utils/getHourDate')
const stripe = require('stripe')('sk_test_51J4vDPC7VwF1036sXv1yUe2SC6WTY3kpNLedaXBqXsluHx2MJzuBSvCOdULqnmWwTnjPW6ikKjHLWq0x9xcMrRlU00D0FnYvii');
const { 
    trips,
    citys,
    trips_includes,
    trips_not_includes,
    days_disponibles
} = require('../databases/models')
class TripControllers {
    async createTrip(request, response) {
        const {
            city,
            name,
            uf,
            value,
            duration,
            schedule_initial,
            schedule_end,
        } = request.body
        
        const parsedIncludes = JSON.parse(request.body.trips_includes)
        const parsedNotIncludes = JSON.parse(request.body.trips_not_includes)
        const parsedDays = JSON.parse(request.body.days_disponibles)
       
       try{
            const productStripe = await stripe.products.create({
                name,
                type: 'service'
            })

            const priceProductStripe = await stripe.prices.create({
                currency: 'brl',
                unit_amount: value * 100,
                product: productStripe.id
            })
            const checkExistsCity = await citys.findOne({where: {name: city}})
            
            if(!checkExistsCity){
                var generateCity = await citys.create({
                    name: city,
                })
            }

            const generateTrip = await trips.create({
                id_product: productStripe.id,
                id_price: priceProductStripe.id,
                id_city: checkExistsCity ? checkExistsCity.id : generateCity.id,
                image: `http://192.168.1.48:8080/uploads/${request.files[0].filename}`,
                name,
                uf,
                value,
                duration,
                schedule_initial,
                schedule_end,      
            })

            const idTrip = generateTrip.id
            const modifiedIncludes = parsedIncludes.map((item)=>{
                return {id_trip: idTrip, name: item.name}
            })
            
            const generateIncludes = await trips_includes.bulkCreate(modifiedIncludes)
            
            const modifiedNotIncludes = parsedNotIncludes.map((item)=>{
                return {id_trip: idTrip, name: item.name}
            })
            
            const generateNotIncludes = await trips_not_includes.bulkCreate(modifiedNotIncludes)

            const modifiedDays = parsedDays.map((item)=>{
                return {id_trip: idTrip, day: item.day}
            })
            const generateDays = await days_disponibles.bulkCreate(modifiedDays)
            
            return response.status(200).send({ msg: 'Passeio criado com sucesso' })
       }
       catch(err){
           return response.status(400).send({error: 'Algo deu errado, tente novamente mais tarde!'})
       }
    }
    async readTrip(request,response){
        const {id} = request.params
        try{
            const getTrip = await trips.findOne({where: {id}, include:[
                {
                    model: days_disponibles,
                },
                { 
                    model: trips_includes,
                },
                {
                    model: trips_not_includes,
                },
                {
                    model: citys,
                },
            ]})

            const arr = [getTrip]
            const modifiedTrip = arr.map((trip, index)=>{
                return {
                        data: getTrip,
                        schedule_initial: getHourDate(trip.schedule_initial),
                        schedule_end: getHourDate(trip.schedule_end),
                        duration: getHourDate(trip.duration)
                    }
            })
            return response.status(200).send(modifiedTrip)
        }
        catch(err){
            return response.status(400).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }
        
           
    }
    async readTrips(request, response) {
        const {q:query, c:city, uf } = request.query
        try {
            let getTrip;
            if (city) {
                getTrip = await trips.findAll({
                    include: {
                        model: citys,
                        where: {name: city}
                    },
                })
            } 
            else if (uf) {
                getTrip = await trips.findAll({
                    where: {uf}
                })

            }
            else if (query) {
                getTrip = await trips.findAll({
                    where: {
                        uf: {
                            [Op.like]: `%${query}%`
                        }
                    }
                })
            } 
            else {
                getTrip = await trips.findAll()
            }
            const modifiedTrip = getTrip.map((trip, index)=>{
                return {
                    data: getTrip[index],
                    schedule_initial: getHourDate(trip.schedule_initial),
                    schedule_end: getHourDate(trip.schedule_end),
                    duration: getHourDate(trip.duration),
                    
                }   
            })
            return response.status(200).send(modifiedTrip)

        } catch (err) {
            return response.status(400).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }
    }
    async updateTrip (request, response) {
        const {id} = request.params
        const {
            uf,
            city,
            name,
            value,
            image,
            duration,
            schedule_initial,
            schedule_end,
            id_product,
            id_price,
        } = request.body

        const parsedIncludes = JSON.parse(request.body.trips_includes)
        const parsedNotIncludes = JSON.parse(request.body.trips_not_includes)
        const parsedDays = JSON.parse(request.body.days_disponibles)
        let idNewCity;

        try{
            const updateProductStripe = await stripe.products.update(
                id_product,
                {
                    name,
                    type: 'service'
                }
            )

            const updatePriceProductStripe = await stripe.prices.update(
                id_price,
                {
                    currency: 'brl',
                    unit_amount: value * 100,
                    product: productStripe.id
                }
            )
            const checkExistsThisCity = await citys.findOne({
                where: {
                    name: city
                }
            })
            const idCity = checkExistsThisCity ? checkExistsThisCity.id : '';
            
            if(!idCity){
                const generateCity = await citys.create({
                    name: city
                })
                idNewCity = generateCity.id
            }
            const modernizeTrip = await trips.update({
                id_product: updateProductStripe.id,
                id_price: updatePriceProductStripe.id,
                uf,
                name,
                value,
                duration,
                schedule_initial,
                schedule_end,
                image: image ? image : `http://192.168.1.48:8080/uploads/${request.files[0].filename}`,
                id_city: idCity ? idCity : idNewCity
            },
                {where: {id: id}
            })
            
            // Remove todos os includes do passeio e inseri os enviados pelo usuário
            const removeAllIncludesTrip = await trips_includes.destroy({
                where: {
                    id_trip: id
                }
            })
            const modifiedIncludesTrip = parsedIncludes.map((include)=>{
                return {id_trip: id, name: include.name}
            })
            const insertIncludes = await trips_includes.bulkCreate(modifiedIncludesTrip)

            
            // Remove todos os not includes do passeio e inseri os enviados pelo usuário
            
            const removeAllNotIncludeTrip = await trips_not_includes.destroy({
                where: {
                    id_trip: id
                }
            })
            const modifiedNotIncludesTrip = parsedNotIncludes.map((notInclude)=>{
                return {id_trip: id, name: notInclude.name}
            })
            const insertNotIncludes = await trips_not_includes.bulkCreate(modifiedNotIncludesTrip)
            
            // Remove todos os days_disponibles do passeio e inseri os enviados pelo usuário
           
            const removeAllDaysTrip = await days_disponibles.destroy({
                where: {
                    id_trip: id
                }
            })
            
            const modifiedDaysTrip = parsedDays.map((day_disponible)=>{
                return {id_trip: id, day: day_disponible.day}
            })                
            const insertDays = await days_disponibles.bulkCreate(modifiedDaysTrip)
        
            return response.status(200).send({msg:'Atualização realizada com sucesso!'})
        }
        catch(err){
            return response.status(400).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }

    }
    async deleteTrip (request, response) {
        const {id} = request.params
        try {
            const removeTrip = await trips.destroy({
                where:{
                    id: id
                }
            })
            return response.status(200).send({msg:'Deletado com sucesso!'})
        } catch (err) {
            return response.status(400).send({error:'Algo deu errado, tente novamente mais tarde!'})
        }
    }
}

module.exports = new TripControllers()