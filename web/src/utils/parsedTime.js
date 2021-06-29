import React from 'react'
import {format, parse } from 'date-fns'

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
    const iso = parse(date, 'dd-MM-yyyy', new Date())
    const [hour, minutes] = time.split(':')
    iso.setHours(hour)
    iso.setMinutes(minutes)
    const datetime = format(iso, 'yyyy-MM-dd HH:mm')
    return datetime
}