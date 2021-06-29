import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../Home/Header/index'
import api from '../../config/api'
import { useCheckOut } from '../../context/checkout'
import { useAuthenticate } from '../../context/authenticate'
import { AuthModal } from './authModal/index'
import * as Yup from 'yup'
import {
    MdDone,
    MdClose,
    MdTimer,
    MdRoom,
    MdCheckCircle,
    MdFiberManualRecord
} from 'react-icons/md'

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
    Select,
    Input,
    Text,
    Option,
    BoxPriceRight,
    TextDetailPrice,
    TextPrice,
    ButtonToAddBag,
    WrapperCalendar,
    BoxTrip
} from '../../components/styles-details-trip'

const DetailsTrip = () => {
    // Datas from/for form
    const [errors, setErrors] = useState({})
    const [numbersPeople, setNumberPeople] = useState(1)
    const [priceTravel, setPriceTravel] = useState()
    const [endPrice, setEndPrice] = useState(0)
    const [showCalendar, setShowCalendar] = useState('')
    const [dateSelected, setDateSelected] = useState('')
    const [schedules, setSchedules] = useState([])
    const [schedule, setSchedule] = useState('')
    const [trips, setTrips] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    // Contexts and hooks
    const { id, name } = useParams()
    const { handleAddStoragedTrips, setShowCheckOut } = useCheckOut()
    const { authenticate, profile: { idUser } } = useAuthenticate()

    const FormSchema = Yup.object().shape({
        dateSelected: Yup
            .string()
            .required('Campo obrigatório')
        ,
        schedule: Yup
            .string()
            .required('Campo obrigatório')
        ,
        numbersPeople: Yup
            .number()
            .integer('Número exato')
            .positive('Não existe esse número de pessoas')
            .required('Campo obrigatório')
        ,
    })
    useEffect(() => {
        (async () => {
            const response = await api.get(`/trip/${id}`)
            const data = response.data

            setPriceTravel(data[0].data.value)
            setEndPrice(data[0].data.value)
            return setTrips(data)
        })()

    }, [])

    const handleChangeNumbersPeople = (event) => {
        const people = event.target.value
        setNumberPeople(people)
        return handleChangePriceTravel(people)
    }

    const handleChangePriceTravel = (value) => {
        const price = priceTravel * value
        return setEndPrice(price)
    }

    const handleShowCalendar = () => {
        const toggleCalendar = showCalendar ? false : true
        return setShowCalendar(toggleCalendar)
    }
    const handleDateSelected = async (value) => {
        const formatDate = format(value, 'dd-MM-yyyy')
        setShowCalendar(false)
        const response = await api.get(`/trip/${id}/${formatDate}`)
        const data = response.data
        setSchedules(data)
        return setDateSelected(formatDate)

    }
    const handleChangeSchedule = (event) => {
        const { value } = event.target
        return setSchedule(value)
    }
    const handleAddItems = async () => {
        try {
            const isValid = await FormSchema.validate({
                dateSelected,
                schedule,
                numbersPeople
            }, { abortEarly: false })

        }
        catch (errors) {
            const schemaErrors = errors.inner.reduce((obj, item) => ((obj[item.path] = item.message), obj), {});
            return setErrors(schemaErrors)
        }
        if (!authenticate) {
            return setModalVisible(!modalVisible)
        }
        handleAddStoragedTrips({
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
        })


    }
    return (
        <Container>
            <NavBar />
            <BoxContent>
                <ClusterSelected>
                    <MdCheckCircle color="white" />Sua escolha
            </ClusterSelected>
                <BoxTrip>
                {trips.length > 0 && trips.map((trip) => {
                    return (
                        <BoxDescription>
                            <TextLocal>
                                <MdRoom />Local: {trip.data.name}, {trip.data.uf}
                            </TextLocal>
                            <ListDuration>
                                <Text>
                                    <MdTimer/>Duração: {trip.duration}
                                </Text>
                                <Text>
                                    <MdFiberManualRecord color="green" />
                                    {trip.data.days_disponibles?.length && trip.data.days_disponibles.map((day_disponible) => {
                                        return day_disponible.day + ','
                                    })}
                                </Text>
                            </ListDuration>
                            <BoxListInclusions>
                                <BoxInclusion>
                                    <TitleInclusion>Inclui</TitleInclusion>
                                    <ListItemsInclusion>
                                        {trip?.data?.trips_includes?.length && trip?.data?.trips_includes?.map((include) => {
                                            return <ItemInclusion><MdDone color="green" />{include.name}</ItemInclusion>
                                        })}
                                    </ListItemsInclusion>
                                </BoxInclusion>
                                <BoxInclusion>
                                    <TitleInclusion>Não inclui</TitleInclusion>
                                    <ListItemsInclusion>
                                        {trip?.data?.trips_not_includes?.length && trip?.data?.trips_not_includes?.map((not_include) => {
                                            return <ItemInclusion><MdClose color="red" />{not_include.name}</ItemInclusion>
                                        })}
                                    </ListItemsInclusion>
                                </BoxInclusion>
                            </BoxListInclusions>
                            <BoxGroupButtons>
                                <BoxButton>
                                    <Label>DATA</Label>
                                    <Input
                                        placeholder="dd/mm/aaaa"
                                        value={dateSelected}
                                        onClick={handleShowCalendar}
                                    />
                                    <span style={{ color: 'red' }}>
                                        {errors.dateSelected && errors.dateSelected}
                                    </span>
                                    <WrapperCalendar show={showCalendar}>
                                        <Calendar
                                            onClickDay={handleDateSelected}
                                            minDate={new Date()}
                                        />
                                    </WrapperCalendar>

                                </BoxButton>
                                <BoxButton>
                                    <Label>HORARIO</Label>
                                    <Select
                                        style={{
                                            padding: '5px',
                                            borderRadius: '5px',
                                            background: 'white'
                                        }}
                                        onChange={handleChangeSchedule}
                                    >
                                        <Option defaultValue=""> hh:mm</Option>
                                        {schedules.length > 0 && schedules.map((item) => {
                                            return <Option>{item.schedule_initial} até {item.schedule_end}</Option>
                                        })}
                                        {!schedules.length && (
                                            <option value=" " style={{ color: 'red' }}>{schedules.msg}</option>
                                        )}

                                    </Select>
                                    <span style={{ color: 'red' }}>{errors.schedule && errors.schedule}</span>

                                </BoxButton>
                                <BoxButton>
                                    <Label>QUANTIDADE DE PESSOAS</Label>
                                    <Input
                                        value={numbersPeople}
                                        onChange={handleChangeNumbersPeople}
                                        placeholder="Ex:1"
                                    />
                                    <span style={{ color: 'red' }}>
                                        {errors.numbersPeople && errors.numbersPeople}
                                    </span>

                                </BoxButton>
                            </BoxGroupButtons>
                        </BoxDescription>
                    )

                })}

                    <BoxPriceRight>
                        <TextDetailPrice>Preço final por {numbersPeople} pessoa(s)</TextDetailPrice>
                        <TextPrice>R$ {endPrice}</TextPrice>
                        <ButtonToAddBag
                            onClick={handleAddItems}>
                            Adicionar a sacola
                    </ButtonToAddBag>
                    </BoxPriceRight>
                </BoxTrip>
            </BoxContent>
            {modalVisible && (
                <AuthModal handleCloseModal={() => setModalVisible(false)} />
            )}

        </Container>
    )
}
export default DetailsTrip