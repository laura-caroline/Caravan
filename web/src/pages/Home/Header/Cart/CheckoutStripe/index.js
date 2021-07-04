import React, {useEffect, useState, createRef} from 'react';
import {useStripe, useElements, CardElement, Elements} from '@stripe/react-stripe-js';
import { loadStripe} from '@stripe/stripe-js';
import api from '../../../../../config/api'
import {useCheckOut} from '../../../../../context/checkout'
import {parsedTime} from '../../../../../utils/parsedTime'
import ClipLoader from 'react-spinners/ClipLoader'
import {useAuthenticate} from '../../../../../context/authenticate'

import {
  BoxContainer,
  BoxContent,
  BoxDataPayment,
  BoxDescriptionShopping,
  Title,
  BoxCardData,
  BoxCardItem,
  Form,
  Label,
  Input,
  ButtonSubmit,
  BoxContentCart,
  BoxTrip,
  DurationTrip,
  NumbersPeopleTrip,
  ValueTrip,  
  ImageTrip,
  NameTrip,
  DateTrip,
  DescriptionTrip
} from './styles'


const stripePromise = loadStripe('pk_test_51J4vDPC7VwF1036srn6kXrqU2qMkvq6WEXJap1XPDZRhy4xYUsjFMzbGSQrJPpzzI2uijjyNUb6bn3Ue1ruZNVcY00g1RXVTeP');


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false)
  const [trips, setTrips] = useState([])
  const [tripsDatabase, setTripsDatabase] = useState([])
  const [amountWillPaidShopping, setAmountWillPaidShopping] = useState()
  const {profile} = useAuthenticate()

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

   const { 
        showCheckOut, 
        storagedTrips
    } = useCheckOut()
    
    useEffect(()=>{   
        if(storagedTrips){
            const findoutTripsOfUser = storagedTrips.filter((trip)=>{
                return trip.id_user == profile.idUser
            })
            const tripsDb = findoutTripsOfUser.map((trip) => {
              return {
                  id_user: trip.idUser,
                  id_trip: trip.id_attraction,
                  numbers_people: trip.numbers_people,
                  schedule_initial: parsedTime(trip.schedules[0]?.schedule_initial),
                  schedule_end: parsedTime(trip.schedules[0].schedule_end),
                  date_utc: trip.date_utc,
                  value: trip.value
              }
          })
          let valueInitial = 0
          const amountWillPaidShop = findoutTripsOfUser.reduce((acc, current)=>{
              return acc + current.value
          }, valueInitial) 

          setAmountWillPaidShopping(amountWillPaidShop)
          setTripsDatabase(tripsDb)          
          return setTrips(findoutTripsOfUser)
        }
    },[profile])


  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    const response = await api.post('/payment-sheet', {all: trips })
    const data = response.data
    console.log(data)


    if (!stripe || !elements) {
      setLoading(false)
      return '';
    }

    const result = await stripe.confirmCardPayment(`${data.paymentIntent}`, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    })

    if (result.error) {
      setLoading(false)
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setLoading(false)
        const response = await api.post('/payment', {data: tripsDatabase})
        const data = response.data
      }
    }
  }
  
  return (
    <BoxContainer>
      <BoxContent>
        <BoxDescriptionShopping>
          <Title>Passeios a serem adquiridos</Title>
          {trips.length > 0 && trips.map((trip)=>{
            return(
              <BoxTrip>
                <ImageTrip src={trip.image}/>
                <DescriptionTrip>
                  <NameTrip>{`Nome do passeio: ${trip.name}`}</NameTrip>
                  <DateTrip>{`Data: ${trip.date}`}</DateTrip>
                  <DurationTrip>{`Duração: ${trip.duration}`}</DurationTrip>
                  <NumbersPeopleTrip>{`Qtd de pessoas: ${trip.numbers_people}`}</NumbersPeopleTrip>
                  <ValueTrip>{`Valor por pessoa: ${trip.value}`}</ValueTrip>

                  <ValueTrip>{`Valor total: ${trip.value * trip.numbers_people}`}</ValueTrip>
                </DescriptionTrip>
              </BoxTrip>
              
            )
          })}

        </BoxDescriptionShopping>
        <BoxDataPayment>
          <Title>Pagar com cartão</Title>
          <Form onSubmit={(event)=> handleSubmit(event)}>
            <BoxContentCart>
              <Label>Email:</Label>
                <BoxCardItem>
                  <Input type="email" required placeholder="Digite seu email"/>
                </BoxCardItem>
              <Label>Dados do cartão:</Label>
                <BoxCardData>
                  <CardElement options={CARD_ELEMENT_OPTIONS} />
                </BoxCardData>
              <Label>Nome do cartão:</Label>
                <BoxCardItem>
                  <Input type="text" required placeholder="Digite o nome"/>
                </BoxCardItem> 
            </BoxContentCart>
            
            <ButtonSubmit disabled={!stripe}>
              {!loading ? `Pagar R$ ${amountWillPaidShopping}`: <ClipLoader size="20" color="white"/>}
            </ButtonSubmit>
          </Form>
        </BoxDataPayment>
       
      </BoxContent>
    </BoxContainer>
      
    
  );
}