
const stripe = require('stripe')('sk_test_51J4vDPC7VwF1036sXv1yUe2SC6WTY3kpNLedaXBqXsluHx2MJzuBSvCOdULqnmWwTnjPW6ikKjHLWq0x9xcMrRlU00D0FnYvii');
const YOUR_DOMAIN = 'http://192.168.1.48:3000'

module.exports = async (request, response)=>{
    console.log('aqui')
    const {itemsStripe, all} = request.body
    console.log(request.body)
    const customer = await stripe.customers.create();


    if(!all){
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: itemsStripe,
            mode: 'payment',
            customer: customer.id,
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
          });
          return response.status(200).send({sessionId: session.id})
    }
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2020-08-27'}
      );

    let valueInitial = 0
    const amountWillPaid = all.reduce((acc, current)=>{
        return acc + current.value
    }, valueInitial)

    const paymentIntent = await stripe.paymentIntents.create({
    amount: amountWillPaid,
    currency: 'brl',
    customer: customer.id,
    });

    console.log(paymentIntent.client_secret, customer.id, ephemeralKey)
    return response.status(200).send({
        paymentIntent: paymentIntent.client_secret,     
        customer: customer.id,
        ephemeralKey: ephemeralKey.secret
    })
}
