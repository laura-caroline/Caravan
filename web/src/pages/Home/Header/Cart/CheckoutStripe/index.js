import React, { useEffect, useState } from 'react';
import api from '../../../../../config/api'
import { loadStripe } from '@stripe/stripe-js';
import { parsedTime } from '../../../../../utils/parsedTime'
import {format} from 'date-fns'

const stripePromise = loadStripe('pk_test_51J4vDPC7VwF1036srn6kXrqU2qMkvq6WEXJap1XPDZRhy4xYUsjFMzbGSQrJPpzzI2uijjyNUb6bn3Ue1ruZNVcY00g1RXVTeP');

const CheckoutStripe = ({ items }) => {
    const [trips, setTrips] = useState([])
    const [idsTrips, setIdsTrips] = useState([])

    useEffect(() => {
        if (items) {
        // Get data of trip for save the order and the payment
            const modf = idsTrips.map((trip) => {
                return {
                    id_user: trip.idUser,
                    id_trip: trip.id_attraction,
                    numbers_people: trip.numbers_people,
                    schedule_initial: parsedTime(trip.schedules[0]?.schedule_initial),
                    schedule_end: parsedTime(trip.schedules[0].schedule_end),
                    date: format(trip.date, 'yyyy-MM-dd'),
                    value: trip.end_price

                }
            })
            setIdsTrips(modf)
            // Get ids, quantity trips/peoples and id of thats perfomed the buy
            const modified = items.map((trip) => {
                return {
                    price: trip.id_price,
                    quantity: parseInt(trip.numbers_people)
                }
            })
            return setTrips(modified)
        }
    }, [items])


    const handleClick = async () => {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: trips,
            mode: 'payment',
            successUrl: 'https://localhost:3000/success',
            cancelUrl: 'https://localhost:3000/error',
        });
    }
    return (
        <button
            style={{
                width: '100%',
                cursor: 'pointer',
                background: 'black',
                color: 'white',
                padding: '10px',
                textAlign: 'center',
            }}
            role="link"
            onClick={handleClick}
        >
            Realizar pagamento
        </button>
    );
}

export default CheckoutStripe