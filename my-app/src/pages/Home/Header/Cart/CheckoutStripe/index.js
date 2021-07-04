import React, { useEffect, useState } from 'react';
import api from '../../../../../config/api'
import { Button, Alert } from 'react-native'
import {useRoute} from '@react-navigation/native'
import {useStripe, StripeProvider } from '@stripe/stripe-react-native';
import {format} from 'date-fns'
import {parsedTime} from '../../../../../utils/parsedTime'



const CheckoutStripe = ({items}) => {
    const {initPaymentSheet, presentPaymentSheet } = useStripe()
    const [loading, setLoading] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [tripsStripe, setTripsStripe] = useState([])
    const [tripsDatabase, setTripsDatabase] = useState([])
    
    useEffect(() => {
        if(items){
            const modifiedForDatabase = items.map((trip) => {
                return {
                    id_user: trip.id_user,
                    id_trip: trip.id_trip,
                    numbers_people: trip.numbers_people,
                    schedule_initial: parsedTime(trip.schedules[0]?.schedule_initial),
                    schedule_end: parsedTime(trip.schedules[0]?.schedule_end),
                    date: trip.date_utc,
                    value: trip.value
                }
            })
            setTripsDatabase(modifiedForDatabase)

            const modifiedForStripe = items.map((trip) => {
                return {
                    price: trip.id_price,
                    quantity: parseInt(trip.numbers_people)
                }
            })
            return setTripsStripe(modifiedForStripe)
        }
    }, [items])

    const fetchPaymentSheetParams = async () => {
        const response = await api.post('/payment-sheet', {itemsStripe: tripsStripe, all: items})
        const { paymentIntent, ephemeralKey, customer } = response.data
        
        setClientSecret(paymentIntent);
        return {
            paymentIntent,
            ephemeralKey,
            customer,
        }
    }

    const openPaymentSheet = async () => {
        if (!clientSecret) {
          return;
        }
        setLoading(false);
        const { error } = await presentPaymentSheet({
          clientSecret,
        })
    
        if (!error) {
            const response = await api.post('/payment', {data: tripsDatabase})
            if(response.status === 200){
                Alert.alert('Success', 'Pagamento realizado com sucesso');
            }
        }
    }

    const initialisePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams()
        
        const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            
            
        })
        setLoading(true)
    }

    useEffect(()=>{
        initialisePaymentSheet()
    },[])

    return (
        <StripeProvider publishableKey="pk_test_51J4vDPC7VwF1036srn6kXrqU2qMkvq6WEXJap1XPDZRhy4xYUsjFMzbGSQrJPpzzI2uijjyNUb6bn3Ue1ruZNVcY00g1RXVTeP">
            <Button 
                variant="primary"
                loading={loading}
                title="Realizar pagamento"
                onPress={openPaymentSheet}
                />
        </StripeProvider>
        
        

    )
}

export default CheckoutStripe