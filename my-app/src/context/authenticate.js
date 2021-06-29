import React, {useContext, useEffect,createContext, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../config/api'
const keyAuth = '@auth'
const keyProfiles = '@profiles';


const AuthenticateContext = createContext()

const AuthenticateProvider = ({children})=>{
    const [authenticate, setAuthenticate] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        (async ()=>{
            const getToken = await AsyncStorage.getItem(keyAuth)
            api.defaults.headers.Authorization = `Bearer ${getToken}`
            const response = await api.post('/verify-token-user')
            const {token} = response.data

            if(token){
                const data = JSON.parse(await AsyncStorage.getItem(keyProfiles))
                setProfile(data)
                setAuthenticate(true)
                if(data.hierarchy === 'admin'){
                    setIsAdmin(true)
                }
            }
            return setLoading(false)
        })()
    },[])

    const handleLogin = async (token, data)=>{
        const modifiedTokenAuth = await AsyncStorage.setItem(keyAuth, token)
        const modifiedProfile = await AsyncStorage.setItem(keyProfiles, JSON.stringify(data))
        setAuthenticate(true)
        setProfile(data)
        if(data.hierarchy === 'admin'){
            return setIsAdmin(true)
        }
    }

    const handleLogout = async ()=>{
        const removeItems = await AsyncStorage.multiRemove([keyProfiles, keyAuth])
        setAuthenticate(false)
    }

    const handleModalLogin = async (token, data)=>{
        const modifiedTokenAuth = await AsyncStorage.setItem(keyAuth, token)
        const modifiedProfile = await AsyncStorage.setItem(keyProfiles, JSON.stringify(data))
        setProfile(data)
        setAuthenticate(true)
    }

    const handleAuthenticateEmail = async (Token)=>{
        api.defaults.headers.Authorization = `Bearer ${Token}`
        const response = await api.post('/verify-token-email')
        const data = response.data
        return data.token
    }
    
    return (
        <AuthenticateContext.Provider value={{
            handleLogin,
            handleLogout,
            handleAuthenticateEmail,
            handleModalLogin,
            authenticate,
            setProfile,
            isAdmin,
            profile,
            
        }}>
            {children}
        </AuthenticateContext.Provider>
    )
}

export const useAuthenticate = ()=>{
    const {
        handleLogin, 
        handleLogout,
        handleAuthenticateEmail, 
        handleModalLogin, 
        authenticate, 
        isAdmin,profile, 
        setProfile
    } = useContext(AuthenticateContext)
    
    return {
        handleLogin, 
        handleLogout,
        handleAuthenticateEmail,
        handleModalLogin, 
        authenticate, 
        isAdmin, 
        profile, 
        setProfile
    }
}    

export default AuthenticateProvider