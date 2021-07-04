import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import {Text} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {
    Container,
    BoxListTrips,
    BoxDescription,
    BoxTrip,
    Button,
    Image,
    Local,
    Schedule,
    Duration,
    Value,
} from '../../components/styles-list-trips'

const ListTrips = () => {
    // Datas from/for form
    const [loading, setLoading] = useState(true)
    const [trips, setTrips] = useState([])
    // Hooks 
    const navigation = useNavigation()
    const { 
        trip_uf, 
        trip_city, 
        trip_query 
    } = useRoute().params
    
    useEffect(() => {
        (async () => {
            if (trip_uf) {
                const response = await api.get(`/trip?uf=${trip_uf}`)
                const data = response.data
                setLoading(false)
                return setTrips(data)
            }
            if (trip_city) {
                const response = await api.get(`/trip?c=${trip_city}`)
                const data = response.data
                setLoading(false)
                return setTrips(data)
            }
            if (trip_query) {
                const response = await api.get(`/trip?q=${trip_query}`)
                const data = response.data
                setLoading(false)
                return setTrips(data)
            }
            const response = await api.get(`/trip`)
            const data = response.data
            setLoading(false)
            return setTrips(data)
        })()
    }, [])

    const handleNavigateDetailsTrip = (id) => {
        return navigation.navigate('DetailsTrip', { idTrip: id })
    }
    return (
        <Container>
            <Spinner
                visible={loading}
                textContent="Loading..."
                textStyle={{color: '#FFF'}}
            />
            <BoxListTrips>
            {trips.length > 0 ? trips.map((trip) => {
                return (
                    <BoxTrip>
                        <Image
                            source={{uri: trip.data.image}}
                        />
                        <BoxDescription>
                            <Local>{trip.data.name} - {trip.data.uf}</Local>
                            <Schedule>
                                Horario disponivel: {trip.schedule_initial} até as {trip.schedule_end}
                            </Schedule>
                            <Duration>
                                Duração: {trip.duration} horas
                            </Duration>
                            <Value>
                                Valor: {trip.data.value} R$
                            </Value>
                            <Button
                                title="Saiba mais"
                                onPress={() => handleNavigateDetailsTrip(trip.data.id)}
                            />
                        </BoxDescription>
                    </BoxTrip>
                )
            }):(
                <Text style={{color: 'red'}}>Não tem passeios disponiveis</Text>
            )}
            </BoxListTrips>
        </Container>

    )
}
export default ListTrips