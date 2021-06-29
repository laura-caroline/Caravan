import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {format} from 'date-fns'
import {MdRoom,MdTimer,MdDeleteForever} from 'react-icons/md'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useCheckOut} from '../../context/checkout'
import {useAuthenticate} from '../../context/authenticate'
import * as Yup from 'yup'
import {
    BoxTrip,
    BoxDescription,
    TextLocal,
    Text,
    Option,
    BoxGroupButtons,
    BoxButton,
    Label,
    Input,
    Select,
    WrapperCalendar,
} from '../styles-details-trip'
import {
    BoxContent,
    ActionDown,
    BoxActionsDown,
    Image,
    TextPriceTrip
} from './styles'

const ItemsCart = ({history})=>{
    const [showCalendar, setShowCalendar] = useState('')
    const [tripsFromUser, setTripsFromUser] = useState([])
    
    const {profile: {idUser}} = useAuthenticate()
    const {
        storagedTrips,
        handleDeleteStoragedTrips,
        handleUpdateStoragedTrips,
    } = useCheckOut()

    useEffect(()=>{
        if(storagedTrips){
            const findOutTripsFromUser = storagedTrips.filter((trip)=>{
                return trip.id_user == idUser
            })
            
            return setTripsFromUser(findOutTripsFromUser)
        }
    },[storagedTrips])

    const handleShowCalendar = () => {
        return setShowCalendar(!showCalendar)
    }

    const handleDateCalendar = async (value, index) => {
        const formatDate = format(value, 'dd-MM-yyyy')
        setShowCalendar(false)
        return handleUpdateStoragedTrips(index, {
            date: formatDate
        })
    }

    const handleChangeNumbersPeople = (event, index) => {
        const {value} = event.target
        return handleUpdateStoragedTrips(index,{
            numbers_people: value
        })
    }
    const handleChangeSchedule = (event, index) => {
        const {value} = event.target
        return handleUpdateStoragedTrips(index, {
            schedule: value
        })
    }

    return(
        <div style={{minWidth: '100%'}}>
        {tripsFromUser.length > 0 && tripsFromUser.map((trip, index)=>{
            return(
                <BoxContent>
                    <BoxTrip>
                        <Image src={trip.image} />
                        <BoxDescription> 
                            <TextLocal><MdRoom/>Local: {trip.name}</TextLocal>
                            <Text><MdTimer/>Duração: {trip.duration}</Text>
                            <BoxGroupButtons>
                                <BoxButton style={{width: '40%'}}>
                                    <Label>DATA</Label>
                                    <Input
                                        placeholder="dd/mm/aaaa"
                                        value={trip.date}
                                        onClick={handleShowCalendar}
                                    />
                                    <WrapperCalendar show={showCalendar}>
                                        <Calendar
                                            onClickDay={(event)=> handleDateCalendar(event,index)}
                                            minDate={new Date()}
                                        />
                                    </WrapperCalendar>
                                </BoxButton>
                                <BoxButton style={{width: '40%'}}>
                                    <Label>HORARIO</Label>
                                    <Select
                                        style={{padding: '5px'}}
                                        value={trip.schedule}
                                        onChange={(event)=> handleChangeSchedule(event,index)}
                                    >
                                        <Option defaultValue=""> hh:mm</Option>
                                        {trip.schedules?.length && trip.schedules.map((item) => {
                                            return(
                                                <Option>{item.schedule_initial} até {item.schedule_end}</Option>
                                            ) 
                                        })}
                                    </Select>
                                </BoxButton>
                                <BoxButton style={{width: '20%'}}>
                                    <Label>PESSOA(s)</Label>
                                    <Input
                                        value={trip.numbers_people}
                                        onChange={(event)=> handleChangeNumbersPeople(event, index)}
                                        placeholder="Ex:1"
                                    />
                                </BoxButton>
                        </BoxGroupButtons> 
                    </BoxDescription>
                </BoxTrip>    
                <BoxActionsDown>    
                    <ActionDown 
                        onClick={()=> handleDeleteStoragedTrips(trip)}
                    >
                        <MdDeleteForever color="#a83232" size="30px"/>Deletar atração
                    </ActionDown>
                    <TextPriceTrip>
                        Preço: R$ {trip.priceTravel * trip.numbers_people}
                    </TextPriceTrip>
                </BoxActionsDown>
            </BoxContent>
            )
        })}
        </div>
    )
}
export default withRouter(ItemsCart)