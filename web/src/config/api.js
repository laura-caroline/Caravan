import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080'
})

api.interceptors.request.use((config)=>{
    try{
        const token = localStorage.getItem('@auth')
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