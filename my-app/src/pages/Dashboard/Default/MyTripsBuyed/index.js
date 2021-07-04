import React, {useState, useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'
import api from '../../../../config/api'
import {useAuthenticate} from '../../../../context/authenticate'
import {Picker} from '@react-native-picker/picker'
import {Alert, Text} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
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
    const [loading, setLoading] = useState(true)
    const [trips, setTrips ] = useState([])
    const {profile: {idUser}} = useAuthenticate()
    // hooks
    const navigation = useNavigation()

    useEffect(()=>{
        (async ()=>{
            const response = await api.get(`/payment/${idUser}`)
            const data = response.data
            setLoading(false)
            return setTrips(data)  
        })()
    }, [])

    const handleNavigateDetailsTrip = (id)=>{
        return navigation.navigate('DetailsTrip', {idTrip: id})
    }

    return (
        <BoxContent>
            <Spinner
                visible={loading}
                textContent="Loading..."
                textStyle={{color: '#FFF'}}
            />

            <Title>
                Minhas viagens
            </Title>
            <Container>
            {trips.length > 0 ? trips.map((item)=>(
                <BoxTrip>
                    <Image
                        source={{uri: item.payment.order.trip.image}}
                    />
                    <BoxGroupButtons>
                        <BoxButton style={{width: '25%'}}>
                            <Label>Data:</Label>
                            <Input 
                                value={item.date}
                                editable={false}
                            />
                        </BoxButton>
                        <BoxButton style={{width: '55%'}}>
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
                        <BoxButton style={{width: '20%'}}> 
                            <Label>Pessoas:</Label>
                            <Input 
                                value={item.payment.order.numbers_people}
                            />
                        </BoxButton>
                    </BoxGroupButtons>
                    <Button 
                        title="Saiba mais"
                        onPress={()=> handleNavigateDetailsTrip(item.payment.order.id_trip)}
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


