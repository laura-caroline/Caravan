import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Alert, Text, View} from 'react-native'
import api from '../../../../config/api'
import {Picker} from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useNavigation, useRoute} from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay'
import {
    Container,
    BoxContent,
    BoxTrip,
    BoxListTrips,
    BoxDescription,
    Image,
    Title,
    Local,
    Schedule,
    Duration,
    Value, 
    BoxNavigation
} from '../../../../components/styles-list-trips'

import {
    Label,
    BoxFilter,
} from './styles'

const ListTrips = () => {
    const [loading, setLoading] = useState(true)
    const [ufs, setUfs] = useState([])
    const [filterWithUf, setFilterWithUf] = useState('')
    const [trips, setTrips] = useState([])
    const route = useRoute()
    const navigation = useNavigation()

    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
            const data = await response.json()
            const modifiedUfs = data.map((uf)=>{
                return {
                    sigla: uf.sigla, 
                    nome: uf.nome
                }
            })
            return setUfs(modifiedUfs)
        })()
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async ()=>{
            const response = await api.get(`/trip?q=${filterWithUf}`)
            const data = response.data
            setLoading(false)
            return setTrips(data)
        })
    },[navigation])
    
    const handleDeleteTrip = async(id)=>{
        setLoading(true)
        const response = await api.delete(`/trip/${id}`)
        if(response.status == 200){
            const deleteTrip = trips.filter((trip)=>{
                return trip.data.id !== id
            })
            setTrips(deleteTrip)
            setLoading(false)
            return Alert.alert('Sucess', 'Passeio deletado com sucesso')
            
        }
        setLoading(false)
        return Alert.alert('Error', response.data.error)
                               
    }
    const handleNavigateUpdateTrip= (idTrip)=>{
        return navigation.navigate('UpdateTrip', {idTrip})
    }

    return (
        <Container>
        <BoxContent>
            <Spinner
                visible={loading}
                textContent="Loading..."
                textStyle={{color: '#FFF'}}
            />
            <BoxFilter>
                <Picker 
                    selectedValue={filterWithUf} 
                    onValueChange={(uf)=> setFilterWithUf(uf)}
                > 
                    <Picker.Item 
                        label="Escolha um estado para filtrar"
                        value=""
                    />
                    {ufs.length > 0 && ufs.map((uf)=>{
                        return (
                            <Picker.Item 
                                label={uf.nome}
                                value={uf.sigla}
                            />
                        )
                    })}
                </Picker>
                {!trips.length > 0 &&(
                    <Text style={{padding: 10,color: 'red'}}>
                        Nesse estado não tem passeios
                    </Text>
            )}
            </BoxFilter>
            <BoxListTrips>
            {trips.length > 0 && trips.map((trip)=>{
                return(
                    <BoxTrip>
                        <Image source={{uri: trip.data.image}}/>
                        <BoxDescription>
                            <Local>
                                {trip.data.name} - {trip.data.uf}
                            </Local>
                            <Schedule>
                                Horario disponivel: {trip.schedule_initial} até as {trip.schedule_end}
                            </Schedule>
                            <Duration>
                                Duração: {trip.duration} horas
                            </Duration>
                            <Value>Valor: {trip.data.value} R$</Value>                                
                        </BoxDescription>
                        <BoxNavigation>
                            <Icon
                                style={{marginRight: 20}}
                                name="delete"
                                color="black"
                                size={35}
                                onPress={()=> handleDeleteTrip(trip.data.id)}
                            />
                            <Icon   
                                name="create"
                                size={35}
                                onPress={()=> handleNavigateUpdateTrip(trip.data.id)}
                            
                            />
                        </BoxNavigation>
                    </BoxTrip>
                )
            })}
            
            
        </BoxListTrips>
    </BoxContent>
    </Container>
            
    )
}
export default ListTrips