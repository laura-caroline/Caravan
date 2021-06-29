import React, { useEffect, useState } from 'react';
import api from '../../../../../config/api'
import { Button, View } from 'react-native'
import {useRoute} from '@react-navigation/native'
import {useStripe, initStripe, StripeProvider } from '@stripe/stripe-react-native';
import { fetchPublishableKey } from './helpers';



const CheckoutStripe = () => {
    const { initPaymentSheet, presentPaymentSheet } = useStripe()
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [tripsStripe, setTripsStripe] = useState([])

    const {items} = useRoute().params

    
    useEffect(() => {
        if(items){
            const modified = items.map((trip) => {
                return {
                    price: trip.id_price,
                    quantity: parseInt(trip.numbers_people)
                }
            })
            return setTripsStripe(modified)
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
        setLoading(true);
        const { error } = await presentPaymentSheet({
          clientSecret,
        })
    
        if (error) {
          Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
          Alert.alert('Success', 'The payment was confirmed successfully');
        }
        setPaymentSheetEnabled(false);
        setLoading(false);
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
            customFlow: false,
            style: 'alwaysDark',
        })

        console.log(error)
        if (!error) {
            setPaymentSheetEnabled(true);
        }
    }

    useEffect(()=>{
        initialisePaymentSheet()
    },[])

    return (
        <StripeProvider publishableKey="pk_test_51J4vDPC7VwF1036srn6kXrqU2qMkvq6WEXJap1XPDZRhy4xYUsjFMzbGSQrJPpzzI2uijjyNUb6bn3Ue1ruZNVcY00g1RXVTeP">
            <Button 
                variant="primary"
                loading={loading}   
                disabled={!paymentSheetEnabled}
                title="Checkout"
                onPress={openPaymentSheet}
                />
        </StripeProvider>
        
        

    )
}

export default CheckoutStripe