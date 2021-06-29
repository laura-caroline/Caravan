import React, {useContext, useEffect,createContext, useState} from 'react'
import api from '../config/api'
import {withRouter} from 'react-router-dom'
const keyAuth = '@auth'
const keyProfiles = '@profiles';
const AuthenticateContext = createContext()


const AuthenticateProvider = ({history,children})=>{
    const [authenticate, setAuthenticate] = useState(false)
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    
    useEffect(()=>{
        (async ()=>{
            const getToken = localStorage.getItem(keyAuth)
            api.defaults.headers.Authorization = `Bearer ${getToken}`
            const response = await api.post('/verify-token-user')
            const {token} = response.data

            if(token){
                const dataProfile = JSON.parse(localStorage.getItem('@profiles'))
                const {hierarchy} = dataProfile
                setProfile(dataProfile)
                setAuthenticate(true)
                if(hierarchy === 'admin'){
                    setIsAdmin(true)
                }
            }
            return setLoading(false)
        })()
    },[])
    const handleLogin = (token, data)=>{
        localStorage.setItem(keyAuth, token)
        localStorage.setItem(keyProfiles, JSON.stringify(data))
        setAuthenticate(true)
        setProfile(data)

        const {User, hierarchy} = data
        if(hierarchy === 'admin'){
            return history.push(`/user/${User}/passeios`)
        }
        return history.push(`/user/${User}/meus-passeios`)


        
    }
    const handleLogout = ()=>{
        localStorage.removeItem(keyProfiles)
        localStorage.removeItem(keyAuth)
        setProfile({})
        setAuthenticate(false)
        return history.push('/entrar')
    }
    const handleModalLogin = (token, data)=>{
        localStorage.setItem(keyAuth, token)
        localStorage.setItem(keyProfiles, JSON.stringify(data))
        setProfile(data)
        setAuthenticate(true)
    }
    const handleAuthenticateEmail = async(Token)=>{
        console.log(Token)
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
            profile,
            isAdmin
            
        }}>
            {children}
        </AuthenticateContext.Provider>
    )
}

export const useAuthenticate = ()=>{
    const {handleLogin, handleLogout,handleAuthenticateEmail, handleModalLogin, authenticate, profile, setProfile, isAdmin} = useContext(AuthenticateContext)
    return {handleLogin, handleLogout,handleAuthenticateEmail,handleModalLogin, authenticate , profile, setProfile, isAdmin}
}    

export default withRouter(AuthenticateProvider)