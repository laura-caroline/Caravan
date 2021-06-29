import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import NavBar from '../Home/Header/index'
import api from '../../config/api'
import {
    Container,
    BoxListTrips,
    BoxTrip,
    Image,
    Title,
    BoxDescriptionTrip,
    Text,
    Button
} from '../../components/styles-list-trip'

const ListTrip = ({ location }) => {
    const [trips, setTrips] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const response = await api.get(`/trip/${location.search}`)
            const data = response.data
            setLoading(false)
            setTrips(data)
        })()
    }, [location.search])

    return (
        <Container>
            <NavBar/>
            <BoxListTrips>
                <ClipLoader loading={loading} />
                {trips.length > 0 && trips.map((trip) => {
                    return (
                        <BoxTrip>
                            <Image src={trip.data.image} />
                            <BoxDescriptionTrip>
                                <Title>
                                    {trip.data.name} - {trip.data.uf}
                                </Title>
                                <Text>
                                    Horario disponivel: {trip.schedule_initial} até as {trip.schedule_end}
                                </Text>
                                <Text>
                                    Duração: {trip.duration} horas
                                </Text>
                                <Text>
                                    Valor: {trip.data.value} R$
                                </Text>
                                <Button 
                                    style={{ marginTop: '20px' }}
                                >
                                    <a style={{ 
                                        display: 'block', 
                                        color: 'white', 
                                        textDecoration: 'none' 
                                    }} 
                                        href={`/trip/${trip.data.id}`}
                                        >
                                            Saiba mais
                                        </a>
                                </Button>
                            </BoxDescriptionTrip>
                        </BoxTrip>
                    )
                })}
            </BoxListTrips>
        </Container>
    )
}
export default ListTrip 