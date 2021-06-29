import React from 'react'

const handleShowCalendar = () => {
    const toggleCalendar = showCalendar ? false : true
    return setShowCalendar(toggleCalendar)
}

const handleDateCalendar = async (value, index) => {
    const {
        name, 
        id
    } = response[index]
    const formatDate = format(value, 'dd-MM-yyyy')
    setShowCalendar(false)
    const {data} = await api.get(`/cidades/schedules/${name}/${id}/${formatDate}`)
    setSchedules(data)
    response[index] = {...response[index],dateCalendar: formatDate}
    localStorage.setItem('Attractions',JSON.stringify(response))
    return window.location.reload()
}
const handleDatesDisponibles = ({ date, view }) => {
    const formatDate = format(date, 'dd/MM/yyyy')
    const arr = ['25/10/2020', '26/10/2020', '27/10/2020', '28/10/2020']
    return arr.includes(formatDate)
}