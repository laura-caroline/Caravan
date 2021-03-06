import React, {useState, useEffect} from 'react'
import {MdRoom} from 'react-icons/md'
import {format, } from 'date-fns'
import api from '../../../../config/api'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {Dashboard} from '../../index'
import {useAuthenticate} from '../../../../context/authenticate'
import {
    Container,
    BoxContent,
    Title,
    BoxListTrips,
    BoxTrip,
    BoxFilters,
    BoxFilter,
    Image,
    BoxDescription,
    TextLocal,
    BoxGroupButtons,
    BoxButton,
    Label,
    Input,
    Select,
    Option,
    BoxPrice,
    TextPriceTrip,
    MessageError,
    Receipt,
    BoxCalendar
} from './styles'

const TripsSelled = () => {
    const [trips, setTrips ] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [date, setDate] = useState('')
    const {profile: {idUser}} = useAuthenticate()
    
    useEffect(()=>{
        (async ()=>{
            const response = await api.get(`/payment`)
            console.log(response)
            const data = response.data
            return setTrips(data)
        })()
    }, [])

    const handleClickCalendar = async (date)=>{
        const formatBrazil = format(date, 'dd-MM-yyyy')
        const formatUtc = format(date, 'yyyy-MM-dd')
        
        const response = await api.get(`/payment/?date=${formatUtc}`)
        const data = response.data
        setTrips(data)
        setDate(formatBrazil)
        return setIsVisible(!isVisible)
    }

    const handleVisibleCalendar = ()=>{
        return setIsVisible(!isVisible)
    }

    return (
        <Container>
        <Dashboard />
        <BoxContent>   
            <Title>Passeios vendidos</Title>
            <BoxFilters >
                <BoxFilter>
                    <Label>Escolha uma data para filtrar </Label>
                    <Input 
                        value={date}
                        onClick={handleVisibleCalendar}
                        placeholder="dd/mm/hh"/>
                    <BoxCalendar isVisible={isVisible} >
                        <Calendar
                            onClickDay={handleClickCalendar}
                        />
                    </BoxCalendar>
                </BoxFilter>
            </BoxFilters>
            <BoxListTrips>
           
            {trips.length > 0 && trips.map((item)=>{
                return(
                    <BoxTrip>
                        <Image 
                            src={item.payment.order.trip.image}
                        />
                        <BoxDescription> 
                            <TextLocal>
                                <MdRoom/>Local: {item.payment.order.trip.name}
                                <p>Nome do usu??rio: {item.payment.order.user.name}</p>
                                <p>CPF do usu??rio: {item.payment.order.user.cpf}</p>
                            </TextLocal>
                            <BoxGroupButtons>
                                <BoxButton>
                                    <Label>DATA</Label>
                                    <Input 
                                        value={item.date}
                                        disabled
                                    />
                                </BoxButton>
                                <BoxButton>
                                    <Label>HORARIO</Label>
                                    <Select disabled >
                                        <Option >
                                            {item.schedule_initial} at?? as {item.schedule_end}
                                        </Option> 
                                    </Select>
                                </BoxButton>
                                <BoxButton>
                                    <Label>PESSOA(s)</Label>
                                    <Input 
                                        value={item.payment.order.numbers_people}
                                        disabled
                                    />
                                </BoxButton>
                        </BoxGroupButtons> 
                    </BoxDescription>
                    <BoxPrice>
                        <TextPriceTrip>
                            Pre??o: R$ {item.payment.value}
                        </TextPriceTrip>
                    </BoxPrice>
                </BoxTrip> 
                ) 
            })}
             </BoxListTrips>
            {trips.length === 0 && (
                <MessageError>N??o houve vendas</MessageError>
            )}            
        </BoxContent>
        
        </Container>
    )
}
export default TripsSelled


