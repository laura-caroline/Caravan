const {Op} = require('sequelize')
const {users_trips, users, trips} = require('../databases/models')
const {parseISO}  = require('date-fns')
const {getHourDate, getDate} = require('../utils/getHourDate')

class tripGuideControllers{
    async createUserTrip (request, response){
        const {
            trips
        } = request.body
        try{
            const generateUserWithTrips = await users_trips.bulkCreate(trips)
            return response.status(200).send({msg: 'Passeio comprado com sucesso'})
        }
        catch(err){
            return response.status(400).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }
    }
    async readTripsUsers(request, response){
        const {date} = request.query

        let getTrips;
        try{
            if(!date){
                getTrips = await users_trips.findAll({include: [
                    {model: users},
                    {model: trips}
                ]})
            }
            else{
                getTrips = await users_trips.findAll({
                    where: {
                        date: date
                    },
                    include: [
                        {model: users},
                        {model: trips}
                    ]

                 })
            }
            const modifiedTrips = getTrips.map((trip)=>{
                return {
                    dataCurrent: trip,
                    dataModified: {
                        date: getDate(trip.date),
                        image: trip.image,
                        schedule_initial: getHourDate(trip.schedule_initial),
                        schedule_end: getHourDate(trip.schedule_end),
                        numbers_people: trip.numbers_people,
                        end_price: trip.end_price,
                        id_attraction: trip.id_attraction,
                    }
                }
            })
            return response.status(200).send(modifiedTrips)

        }
        catch(err){
            return response.status(400).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }
    }
    async readTripsUser (request,response){
        const {idUser} = request.params
        try{
            const getTrips = await users_trips.findAll({where:{id_user: idUser},
                include: {model: trips}
            })
            const modifiedTrips = getTrips.map((trip)=>{
                return {
                    dataCurrent: trip,
                    dataModified: {
                        date: getDate(trip.date),
                        image: trip.image,
                        schedule_initial: getHourDate(trip.schedule_initial),
                        schedule_end: getHourDate(trip.schedule_end),
                        numbers_people: trip.numbers_people,
                        end_price: trip.end_price,
                        id_attraction: trip.id_attraction,
                    }
                }
            })
            return response.status(200).send(modifiedTrips)
        }
        catch(err){
            return response.status(400).send({error: 'Algo deu errado, tente novamente mais tarde'})
        }
    }
}

module.exports = new tripGuideControllers()