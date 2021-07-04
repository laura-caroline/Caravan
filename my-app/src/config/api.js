import React from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const api = axios.create({
    baseURL: 'http://192.168.1.48:8080',
    
})

api.interceptors.request.use(async (config)=>{
    try{
        const token = await AsyncStorage.getItem('@auth')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }       
    catch(err){
        console.log(err)
    }
})

export default api