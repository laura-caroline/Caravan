import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'
import api from '../../../../config/api'
import {useAuthenticate} from '../../../../context/authenticate'
import {Picker} from '@react-native-picker/picker'
import {Text} from 'react-native'
import {
    Container,
    BoxContent,
    Local,
    BoxButton,
    BoxGroupButtons,
    Input,
    Label,
    BoxTrip,
    Button,
    Image,
    Title,

} from '../../../../components/styles-list-trips'

import {
    BoxEmptyTrips,
    EmptyTrips
} from './styles'

const MyTripsBuyed = () => {
    const [trips, setTrips ] = useState([])
    const {profile: {idUser}} = useAuthenticate()
    // hooks
    const navigation = useNavigation()

    useEffect(()=>{
        (async ()=>{
            const response = await api.get(`/payment/${idUser}`)
            const data = response.data
            return setTrips(data)
        })()
    }, [])

    const handleNavigateDetailsTrip = (id)=>{
        return navigation.navigate('DetailsTrip', {idTrip: id})
    }

    return (
        <BoxContent>
            <Title>Minhas viagens</Title>
            <Container>
            {trips.length > 0 ? trips.map((item)=>(
                <BoxTrip>
                    <Image source={item.payment.trip.image}/>
                    <BoxGroupButtons>
                        <BoxButton>
                            <Label>Data:</Label>
                            <Input 
                                value={item.payment.order.date}
                                editable={false}
                            />
                        </BoxButton>
                        <BoxButton>
                            <Label>Horário:</Label>
                            <Picker 
                                style={{padding: 5}} 
                                enabled={false}>
                                <Picker.Item
                                    label={`${item.schedule_initial} até as ${item.schedule_end}`}
                                    value={`${item.schedule_initial} até as ${item.schedule_end}`}
                                />  
                            </Picker>
                        </BoxButton>
                        <BoxButton>
                            <Label>Pessoas:</Label>
                            <Input 
                                value={item.payment.order.numbers_people}
                                editable={false}
                            />
                        </BoxButton>
                    </BoxGroupButtons>
                    <Button 
                        title="Saiba mais"
                        onPress={()=> handleNavigateDetailsTrip(trip.payment.order.id_trip)}
                    />
                </BoxTrip>
                )):(
                    <BoxEmptyTrips>
                        <EmptyTrips>Não houve compras de passeios</EmptyTrips>
                    </BoxEmptyTrips>
                )}
            </Container>
    </BoxContent>
    
)}
export default MyTripsBuyed


