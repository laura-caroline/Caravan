const { request } = require('express')
const { orders, payments, users, trips } = require('../databases/models')
const { getDate, getHourDate } = require('../utils/getHourDate')

const stripe = require('stripe')('sk_test_51J4vDPC7VwF1036sXv1yUe2SC6WTY3kpNLedaXBqXsluHx2MJzuBSvCOdULqnmWwTnjPW6ikKjHLWq0x9xcMrRlU00D0FnYvii');
const YOUR_DOMAIN = 'http://192.168.1.48:3000'
class PaymentControllers {
    static async paymentSheet(request, response) {
        try {
            const { itemsStripe, all } = request.body
            console.log(itemsStripe)
            const customer = await stripe.customers.create();
            if (!all) {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: itemsStripe,
                    mode: 'payment',
                    customer: customer.id,
                    success_url: `${YOUR_DOMAIN}/success.html`,
                    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
                });

                return response.status(200).send({sessionId: session.id })
            }

            const ephemeralKey = await stripe.ephemeralKeys.create(
                { customer: customer.id },
                { apiVersion: '2020-08-27' }
            )
            let valueInitial = 0
            const amountWillPaid = all.reduce((acc, current) => {
                return acc + current.value
            }, valueInitial)
            
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amountWillPaid * 100,
                currency: 'brl',
                customer: customer.id,
            })

            return response.status(200).send({
                paymentIntent: paymentIntent.client_secret,
                customer: customer.id,
                ephemeralKey: ephemeralKey.secret
            })
        }
        catch (error) {
            return response.status(400).send({ error: 'Algo deu errado, tente novamente mais tarde' })
        }
    }

    static async pay(request, response) {
        const {data} = request.body
        console.log(data)
        try {
            const manyOrders = data.map(({
                id_user,
                id_trip,
                value,
                date,
                schedule_initial,
                schedule_end,
                numbers_people
            }) => {
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
            const manysPayments = generateOrder.map((order, index) => {
                return {
                    id_order: order.id,
                    id_user: order.id_user,
                    value: data[index].value,
                    payment_performed: true
                }
            })
            const generatePayments = await payments.bulkCreate(manysPayments)
            return response.status(200).send({ msg: 'Pagamento realizado com sucesso!' })
        }
        catch (err) {
            return response.status(400).send({ error: 'Algo deu errado, tente novamente mais tarde!' })
        }

    }

    static async readTripsPayedUser(request, response) {
        const { id } = request.params
        try {
            const data = await payments.findAll({
                include: {
                    model: orders,
                    required: true,
                    where: {
                        id_user: id
                    },
                    include: {
                        model: trips,
                        required: true
                    }
                }
            })
            const modified = data.map((item, index) => {
                return {
                    payment: data[index],
                    schedule_initial: getHourDate(item.order.schedule_initial),
                    schedule_end: getHourDate(item.order.schedule_end),
                    date: getDate(item.order.date)
                }
            })
            console.log(modified)

            return response.status(200).send(modified)
        }
        catch (err) {
            return response.status(404).send({ error: 'Algo deu errado, tente novamente mais tarde!' })
        }

    }
    static async readAllTripsPayed(request, response) {
        const { date } = request.query
        let data;

        try {
            if (date) {
                data = await payments.findAll({
                    include: {
                        model: orders,
                        required: true,
                        where: {
                            date
                        },
                        include: [
                            {
                                model: trips,
                                required: true
                            },
                            {
                                model: users,
                                required: true
                            }
                        ]
                    }
                })
            }
            else {
                data = await payments.findAll({
                    include: {
                        model: orders,
                        required: true,
                        include: [
                            {
                                model: trips,
                                required: true
                            },
                            {
                                model: users,
                                required: true
                            }
                        ]
                    }
                })
            }

            const modified = data.map((item, index) => {
                return {
                    payment: data[index],
                    schedule_initial: getHourDate(item.order.schedule_initial),
                    schedule_end: getHourDate(item.order.schedule_end),
                    date: getDate(item.order.date)
                }
            })
            return response.status(200).send(modified)
        }
        catch (err) {
            return response.status(404).send({ error: 'Algo deu errado, tente novamente mais tarde!' })
        }
    }
}


module.exports = PaymentControllers