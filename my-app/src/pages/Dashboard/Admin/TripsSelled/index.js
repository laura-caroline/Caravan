import React, {useState, useEffect} from 'react'
import {format,parseISO } from 'date-fns'
import {ActivityIndicator} from 'react-native'
import {CalendarList} from 'react-native-calendars'
import api from '../../../../config/api'
import {Picker} from '@react-native-picker/picker'
import Spinner from 'react-native-loading-spinner-overlay'
import {useAuthenticate} from '../../../../context/authenticate'

import {
    BoxCalendar,
    BoxFilter,
    BoxFilters,
    BoxPrice,
    Error,
    PriceTrip,
    Receipt
} from './styles'
import {
    Container,
    BoxContent,
    Image,
    Title,
    BoxListTrips,
    BoxTrip,
    BoxDescription,
    Local,
    User,
    Cpf,
    Label,
    Input,
    BoxGroupButtons,
    BoxButton,

} from '../../../../components/styles-list-trips'

const TripsSelled = () => {
    const [loading, setLoading] = useState(false)
    const [trips, setTrips ] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [date, setDate] = useState('')
   
    const {profile: {idUser}} = useAuthenticate()
   
    useEffect(()=>{
        (async ()=>{
            const response = await api.get(`/payment`)
            const data = response.data
            setTrips(data)
            return setLoading(false)
        })()
    
    }, [])

    const handleDateSelected = async ({dateString})=>{
        setLoading(true)
        const formatBrazil = format(parseISO(dateString), 'dd-MM-yyyy')
        const formatUtc = format(parseISO(dateString), 'yyyy-MM-dd')
        const response = await api.get(`/payment?date=${formatUtc}`)
        const data = response.data
        setTrips(data)
        setDate(formatBrazil)
        setIsVisible(false)
        setLoading(false)
    }

    const handleVisibleCalendar = ()=>{
        return setIsVisible(!isVisible)
    }

    return (
        <Container>
        <BoxContent style={{padding: 15}}>
            <Spinner
                visible={loading}
                textContent="Loading..."
                textStyle={{color: '#FFF'}}
            />
            <BoxFilters>
                <BoxFilter>
                    <Label style={{fontSize: 18}}>Escolha uma data para filtrar </Label>
                    <Input 
                        value={date}
                        onFocus={handleVisibleCalendar}
                        placeholder="dd/mm/hh"    
                    />
                    <BoxCalendar isVisible={isVisible}>
                        <CalendarList
                            horizontal
                            pagingEnabled
                            onDayPress={(day)=> handleDateSelected(day)}
                        />
                    </BoxCalendar>    
                </BoxFilter>
            </BoxFilters>
            <BoxListTrips>
            
            {trips.length > 0 && trips.map((item)=>{
                return(
                    <BoxTrip>
                        <Image 
                            source={{uri: item.payment.order.trip.image}}
                        />
                        <BoxDescription> 
                            <Local>
                                Local: {item.payment.order.trip.name}
                            </Local>
                            <User>
                                Nome do usuário: {item.payment.order.user.name}
                            </User>
                            <Cpf>
                                CPF do usuário: {item.payment.order.user.cpf}
                            </Cpf>
                            <BoxGroupButtons>
                                <BoxButton>
                                    <Label>DATA</Label>
                                    <Input 
                                        value={item.date}
                                        editable={false}
                                    />
                                </BoxButton>
                                <BoxButton style={{width: '55%'}}>
                                    <Label>HORARIO</Label>
                                    <Picker 
                                        mode="dropdown" 
                                        editable={false}
                                    >
                                        <Picker.Item
                                            label={`${item.schedule_initial} as ${item.schedule_end}`}
                                            value={`${item.schedule_initial} as ${item.schedule_end}`}
                                        />  
                                    </Picker>
                                </BoxButton>
                                <BoxButton style={{width: '20%'}}>
                                    <Label>PESSOA(s)</Label>
                                    <Input 
                                        value={item?.payment?.order?.numbers_people}
                                        editable={false}
                                    />
                                </BoxButton>
                        </BoxGroupButtons> 
                    </BoxDescription>
                    <BoxPrice style={{padding: 15}}>
                        <PriceTrip>
                            Preço: R$ {item.payment.value}
                        </PriceTrip>
                    </BoxPrice>
                </BoxTrip> 
                ) 
            })}
            {trips.length <= 0 && !loading && (
                <Error>
                    Não houve vendas nesta data
                </Error>
            )}    
        </BoxListTrips>   
        </BoxContent>
        </Container>
    )
}
export default TripsSelled


