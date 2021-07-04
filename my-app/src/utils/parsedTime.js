import React from 'react'
import {format, parse} from 'date-fns'

export const parsedTime = (time)=>{
    if(!time){
        return 'Nao tem time'
    }
    const [hour, minutes] = time.split(':')
    const date = new Date()
    date.setHours(hour)
    date.setMinutes(minutes)
    const currentTime = format(date, 'yyyy-MM-dd HH:mm')
    return currentTime
    
}

export const ModifyTimeToDateTime = (date, time)=>{
    if(!time){
        return 'nao tem'
    }
    const iso = parse(date, 'dd-MM-yyyy', new Date())
    const [hour, minutes] = time.split(':')
    iso.setHours(hour)
    iso.setMinutes(minutes)
    const datetime = format(iso, 'yyyy-MM-dd HH:mm')
    return datetime
}


export const sumTime = (schedule_initial, duration)=>{
    if(!schedule_initial && !duration){
        return ""
    }
    const [hours_schedule, minutes_schedule] = schedule_initial.split(':')
    const [hours_duration, minutes_duration] = duration.split(':')

    const sumHours = parseInt(hours_schedule) + parseInt(hours_duration)
    const sumMinutes = parseInt(minutes_schedule) + parseInt(minutes_duration)
    const time = `${sumHours}:${sumMinutes}`
    return time
}


