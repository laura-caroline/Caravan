import React, {useEffect, useState} from 'react'
import {Calendar,CalendarList} from 'react-native-calendars';

import {format, parseISO} from 'date-fns'
import {ScrollView, View} from 'react-native'
import {useCheckOut} from '../../context/checkout'
import {useAuthenticate} from '../../context/authenticate'
import {Picker} from '@react-native-picker/picker'

import {
    BoxTrip,
    BoxDescription,
    TextLocal,
    Text,
    BoxGroupButtons,
    BoxButton,
    BoxCalendar,
    Label,
    Input,
} from '../../components/styles-details-trip'
import {
    BoxContent,
    ActionDown,
    BoxActionsDown,
    Image,
    TextPriceTrip,
    BoxLocal,
    Local,
} from './styles'
import AsyncStorage from '@react-native-community/async-storage';

const ItemsCart = ()=>{
    const [isVisible, setIsVisible] = useState(false)
    const [tripsOfUser, setTripsOfUser] = useState([])
    const {
        storagedTrips,
        handleDeleteStoragedTrips,
        handleUpdateStoragedTrips,
    } = useCheckOut()
    const {profile: {idUser}} = useAuthenticate()

    useEffect(()=>{
        const findoutTripsOfUser = storagedTrips.filter((trip)=>{
            return trip.id_user === idUser
        })
        return setTripsOfUser(findoutTripsOfUser)
    },[])

    const handleVisibleCalendar = () => {
        return setIsVisible(!isVisible)
    }

    const handleDateSelected = async (date, index) => {
        const {dateString} = date
        const formatDate = format(parseISO(dateString), 'dd-MM-yyyy')
        setIsVisible(false)
        return await handleUpdateStoragedTrips(index, {
            date: formatDate
        })
    }

    const handleChangeNumbersPeople = async (value, index) => {
        handleUpdateStoragedTrips(index, {end_price: handleChangeEndPrice(value, index)})
        return await handleUpdateStoragedTrips(index,{
            numbers_people: value
        })
    }
    const handleChangeEndPrice = async (numbers_people, index)=>{
        const storaged = JSON.parse(await AsyncStorage.getItem('@trips'))
        const priceTravel = storaged[index]?.dataSelected?.priceTravel
        const end_price = numbers_people * priceTravel
        return end_price

    }
    const handleChangeSchedule = async (value, index) => {
        return await handleUpdateStoragedTrips(index, {
            schedule: value
        })
    }

    return(
        <ScrollView>
        {tripsOfUser.length > 0 && tripsOfUser.map((trip, index)=>{
            return(
                <BoxContent>
                    <BoxTrip>
                        <Image source={trip.image} />
                        <BoxDescription>
                            <BoxLocal>
                                <Local>
                                    <TextLocal>Local: {trip.name}</TextLocal>
                                    <Text>Duração: {trip.duration}</Text>
                                </Local>
                                <View>
                                    <ActionDown onPress={()=> handleDeleteStoragedTrips(trip)}>
                                        X
                                    </ActionDown>
                                </View>
                            </BoxLocal>
                            <BoxGroupButtons>
                                <BoxButton>
                                    <Label>DATA</Label>
                                    <Input 
                                        placeholder="dd/mm/yyyy"
                                        onFocus={handleVisibleCalendar}
                                        value={trip.date}
                                        
                                    />
                                    <BoxCalendar isVisible={isVisible}>
                                        <CalendarList
                                            horizontal
                                            pagingEnabled
                                            minDate={new Date()}
                                            onDayPress={(day)=> handleDateSelected(day, index)}
                                        />
                                    </BoxCalendar>
                                </BoxButton>
                                <BoxButton >
                                    <Label>HORARIO</Label>
                                    <Picker
                                        style={{padding: 5}}
                                        selectedValue={trip.schedule}
                                        onValueChange={(value)=> handleChangeSchedule(value,index)}
                                    >
                                        <Picker.Item label="hh:mm" value=""/>
                                        {trip.schedules.length && trip.schedules.map((item) => {
                                            return(
                                                <Picker.Item 
                                                    label={`${item.schedule_initial} até ${item.schedule_end}`}
                                                    value={`${item.schedule_initial} até ${item.schedule_end}`}
                                                />
                                            )
                                        })}
                                    </Picker>
                                </BoxButton>
                                <BoxButton>
                                    <Label>PESSOA(s)</Label>
                                    <Input
                                        value={trip.numbers_people}
                                        onChangeText={(value)=>handleChangeNumbersPeople(value, index)}
                                        placeholder="Ex:1"
                                    />
                                </BoxButton>
                        </BoxGroupButtons> 
                    </BoxDescription>
                    <BoxActionsDown>    
                        <TextPriceTrip>
                            Preço: R$ {trip.priceTravel * trip.numbers_people}
                        </TextPriceTrip>
                </BoxActionsDown>
                </BoxTrip>    
                
            </BoxContent>
            )
        })}
        </ScrollView>
    )
}
export default ItemsCart