import React, { useEffect, useState} from 'react'
import api from '../../config/api'
import {useRoute} from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native'
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
import { ActivityIndicator } from 'react-native'

const ListTrips = ()=>{
    // Datas from/for form
    const [loading, setLoading] = useState(true)
    const [trips, setTrips] = useState([])
    // Hooks 
    const navigation = useNavigation()
    const route = useRoute()
    const {trip_uf, trip_county, trip_query} = route.params

    useEffect(()=>{
        (async ()=>{ 
            if(trip_uf){
                const response = await api.get(`/trip?uf=${trip_uf}`)
                const data = response.data
                setLoading(false)
                return setTrips(data)
            }
            if(trip_county){
                const response = await api.get(`/trip?c=${trip_county}`)
                const data = response.data
                setLoading(false)
                return setTrips(data)
            }
            if(trip_query){ 
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
    },[])
    
    const handleNavigateDetailsTrip = (id)=>{
        return navigation.navigate('DetailsTrip', {idTrip: id})
    }
    return(
        <>
        {!loading ? (
            <Container>
                <BoxListTrips>
                    {trips.length > 0 && trips.map((trip)=>{
                        return(
                            <BoxTrip>
                            <Image 
                                source={trip.data.image}
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
                                    onPress={()=> handleNavigateDetailsTrip(trip.data.id)}
                                />
                            </BoxDescription>
                        </BoxTrip>
                        )
                    })}
                </BoxListTrips>
            </Container>
        ):(
            <ActivityIndicator animating={loading} color="gray" size="large"/>
        )}
       </>
    )
}
export default ListTrips