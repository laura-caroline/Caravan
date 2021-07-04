import React, { useState, useEffect, } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native'
import { format, parseISO } from 'date-fns'
import { View, Button, ActivityIndicator } from 'react-native'
import { useAuthenticate } from '../../context/authenticate'
import { useCheckOut } from '../../context/checkout'
import { Picker } from '@react-native-picker/picker'
import { useRoute } from '@react-navigation/native'
import api from '../../config/api'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Spinner from 'react-native-loading-spinner-overlay'

import {
    Container,
    ClusterSelected,
    BoxContent,
    BoxDescription,
    TextLocal,
    BoxListInclusions,
    BoxInclusion,
    TitleInclusion,
    ListItemsInclusion,
    ListDuration,
    ItemInclusion,
    BoxGroupButtons,
    BoxButton,
    Label,
    Input,
    Text,
    BoxPrice,
    TextDetailPrice,
    TextPrice,
    ButtonToAddBag,
    BoxTrip,
    Day,
    BoxCalendar


} from '../../components/styles-details-trip'

const DetailsTrip = () => {
    const [loading, setLoading] = useState(true)
    const [numbersPeople, setNumberPeople] = useState(1)
    const [isVisible, setIsVisible] = useState(false)
    const [priceTravel, setPriceTravel] = useState()
    const [endPrice, setEndPrice] = useState(0)
    const [dateSelected, setDateSelected] = useState('')
    const [schedules, setSchedules] = useState([])
    const [schedule, setSchedule] = useState('')
    const [trips, setTrips] = useState([])
    const [disabledInputPeoples, setDisabledInputPeoples] = useState(true)
    const [dateUTC, setDateUTC] = useState('')
    const navigation = useNavigation()
    const route = useRoute()

    const {
        handleAddStoragedTrip,
        setShowCheckOut
    } = useCheckOut()

    const {
        authenticate,
        profile: { idUser }
    } = useAuthenticate()

    const {
        idTrip
    } = route.params

    useEffect(()=>{
        const unsubscribe = navigation.addListener('blur', ()=>{
            setDateSelected('')
            setSchedule('')
            setNumberPeople(1)
            
        })
    },[navigation])

    useEffect(() => {
        (async () => {
            const response = await api.get(`/trip/${idTrip}`)
            const data = response.data
            setTrips(data)
            setPriceTravel(data[0].data.value)
            setEndPrice(data[0].data.value)
            setLoading(false)
        })()

    }, [])

    const handleVisibleCalendar = () => {
        return setIsVisible(!isVisible)
    }

    const handleChangeNumbersPeople = (people) => {
        setNumberPeople(people)
        return handleChangePriceTravel(people)
    }

    const handleChangePriceTravel = (value) => {
        const price = priceTravel * value
        return setEndPrice(price)
    }

    const handleDateSelected = async ({ dateString }) => {
        setIsVisible(false)
        setLoading(true)

        const formatBrazil = format(parseISO(dateString), 'dd-MM-yyyy')
        const formatUTC = format(parseISO(dateString), 'yyyy-MM-dd')
        const response = await api.get(`/trip/${idTrip}/${formatUTC}`)
        const data = response.data

        setSchedules(data)
        setDateSelected(formatBrazil)
        setDateUTC(formatUTC)
        return setLoading(false)
    }
    const handleChangeSchedule = (value) => {
        return setSchedule(value)
    }

    const handleAddItems = () => {
        handleAddStoragedTrip({
            id_product: trips[0].data.id_product,
            id_price: trips[0].data.id_price,
            id_trip: trips[0].data.id,
            name: trips[0].data.name,
            image: trips[0].data.image,
            duration: trips[0].duration,
            date: dateSelected,
            value: endPrice,
            priceTravel,
            numbers_people: numbersPeople,
            schedule,
            schedules,
            id_user: idUser,
            date_utc: dateUTC
        })
        return navigation.navigate('Cart')

    }
    return (
        <Container>
            <BoxContent>
                <Spinner
                    visible={loading}
                    textContent="Loading..."
                    textStyle={{color: '#FFF'}}
                />
                <ClusterSelected>Sua escolha</ClusterSelected>
                <BoxTrip>
                {trips.length > 0 && trips.map((trip) => {
                return (
                    <BoxDescription>
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <TextLocal>
                                <Icon
                                    name="room"
                                    size={15}
                                />
                                    Local: {trip.data.name}, {trip.data.uf}
                            </TextLocal>
                            <Text>
                                <Icon
                                    name="timer"
                                    size={15}
                                />
                                Duração: {trip.duration}
                            </Text>
                        </View>
                        <View style={{width: '100%'}}>
                            <Text>Dias disponiveis</Text>
                            {trip.data.days_disponibles?.length > 0 
                            && trip.data.days_disponibles.map((day_disponible) => {
                            return (
                                <Day>
                                    <Icon
                                        name="fiber-manual-record"
                                        size={15}
                                        color="green"
                                    />{day_disponible.day}
                                </Day>
                            )
                        })}
                        </View>
                        <BoxListInclusions>
                            <BoxInclusion>
                                <TitleInclusion>Inclui</TitleInclusion>
                                <ListItemsInclusion>
                                    {trip.data.trips_includes?.length 
                                    && trip.data.trips_includes.map((include) => {
                                    return (
                                        <ItemInclusion>
                                            <Icon
                                                name="check"
                                                color="green"
                                                size={15}
                                            />
                                            {include.name}
                                        </ItemInclusion>
                                    )
                                    })}
                                </ListItemsInclusion>
                            </BoxInclusion>
                            <BoxInclusion>
                                <TitleInclusion>Não inclui</TitleInclusion>
                                <ListItemsInclusion>
                                    {trip.data.trips_not_includes?.length 
                                    && trip.data.trips_not_includes.map((not_include) => {
                                    return (
                                        <ItemInclusion>
                                            <Icon
                                                name="close"
                                                color="red"
                                                size={15}
                                            />
                                            {not_include.name}
                                        </ItemInclusion>
                                    )
                                })}
                                </ListItemsInclusion>
                            </BoxInclusion>
                        </BoxListInclusions>
                        <BoxGroupButtons>
                            <BoxButton>
                                <Label>DATA</Label>
                                <Input
                                    onFocus={handleVisibleCalendar}
                                    placeholder="dd/mm/yyyy"
                                    value={dateSelected}
                                />
                            </BoxButton>
                            <BoxButton>
                                <Label>HORARIO</Label>
                                <Picker
                                    style={{
                                        padding: 5,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: '#ddd',
                                        background: 'white'
                                    }}
                                    selectedValue={schedule}
                                    onValueChange={(v) => handleChangeSchedule(v)}
                                >
                                <Picker.Item 
                                    label="hh:mm" 
                                    value="" 
                                />
                                {schedules.length > 0 
                                && schedules.map((item) => {
                                    return (
                                        <Picker.Item
                                            label={`${item.schedule_initial} até ${item.schedule_end}`}
                                            value={`${item.schedule_initial} até ${item.schedule_end}`}
                                        />
                                    )
                                })}
                                {!schedule.length <= 0 && (
                                    <Picker.Item
                                        style={{ color: 'red' }}
                                        label={schedules.msg}
                                        value={schedules.msg}
                                    />
                                )}

                                </Picker>
                            </BoxButton>
                            <BoxButton>
                                <Label>QUANTIDADE DE PESSOAS</Label>
                                <Input
                                    value={numbersPeople}
                                    onChangeText={(v) => handleChangeNumbersPeople(v)}
                                    placeholder="Ex:1"
                                    disabled={disabledInputPeoples}
                                />
                            </BoxButton>
                        </BoxGroupButtons>
                        <BoxCalendar isVisible={isVisible}>
                            <CalendarList
                                horizontal
                                pagingEnabled
                                minDate={new Date()}
                                onDayPress={(day) => handleDateSelected(day)}
                            />
                        </BoxCalendar>
                        <BoxPrice>
                            <TextDetailPrice>
                                Preço final para {numbersPeople} pessoa(s):
                            </TextDetailPrice>
                            <TextPrice>
                                R$ {endPrice}
                            </TextPrice>
                        </BoxPrice>
                        <ButtonToAddBag
                            title="Adicionar ao carrinho"
                            onPress={handleAddItems}
                        />
                    </BoxDescription>
                )       
                })}
                </BoxTrip>
            </BoxContent>
        </Container>
    )
}
export default DetailsTrip;