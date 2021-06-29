const {orders, payments,users, trips} = require('../databases/models')
const {getDate, getHourDate} = require('../utils/getHourDate')

class PaymentControllers{
    static async pay(request, response){
        try{
            const manyOrders = data.map(({id_user, id_trip, value, date, schedule_initial, schedule_end, numbers_people})=>{
                return {
                    id_user,
                    id_trip,
                    schedule_initial,
                    schedule_end,
                    numbers_people,
                    date,
                }
            })
            const generateOrder = await orders.bulkCreate(manyOrders)
            const manysPayments = generateOrder.map((order, index)=>{
                return{
                    id_order: order.id,
                    id_user: order.id_user,
                    id_trip: order.id_trip,
                    value: data[index].value,
                    payment_performed: true
                }
            })
            const generatePayments = await payments.bulkCreate(manysPayments)
            return response.status(200).send({msg: 'Pagamento realizado com sucesso!'})
        }
        catch(err){
            return response.status(400).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }

    }

    static async readTripsPayedUser(request, response){
        const {id} = request.params
        try{
            const data = await payments.findAll({include:{
                model: orders, 
                required: true,
                where:{
                  id_user: id  
                },
                include:{
                    model: trips,
                    required: true
                }
            }})
            
            const modified = data.map((item, index)=>{
                return {
                    payment: data[index],
                    schedule_initial: getHourDate(item.order.schedule_initial),
                    schedule_end: getHourDate(item.order.schedule_end),
                    date: getDate(item.order.date)
                }
            })

            return response.status(200).send(modified)
        }
        catch(err){
            return response.status(404).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }
        
    }
    static async readAllTripsPayed(request, response){
        const {date} = request.query
        let data;

        try{
            // When user to use filter get datas trips payed based at the date
            // else get datas of all trips payed
            if(date){
                data = await payments.findAll({include:{
                    model: orders, 
                    required: true,
                    where:{
                        date
                    },
                    include:[
                        {
                            model: trips,
                            required: true
                        },
                        {
                            model: users,
                            required: true
                        }
                    ]
                }})
            }
            else{
                data = await payments.findAll({include:{
                    model: orders, 
                    required: true,
                    include:[
                        {
                            model: trips,
                            required: true
                        },
                        {
                            model: users,
                            required: true
                        }
                    ]
                }})
            }
            
            const modified = data.map((item, index)=>{
                return {
                    payment: data[index],
                    schedule_initial: getHourDate(item.order.schedule_initial),
                    schedule_end:  getHourDate(item.order.schedule_end),
                    date: getDate(item.order.date)
                }
            })
            return response.status(200).send(modified)
        }
        catch(err){
            return response.status(404).send({error: 'Algo deu errado, tente novamente mais tarde!'})
        }
    }
}


module.exports = PaymentControllers