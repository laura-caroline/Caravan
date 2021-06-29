import React, {useEffect} from 'react'
import {View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useAuthenticate} from '../../../context/authenticate'

const SignOut = () => {
    const navigation = useNavigation()
    const { handleLogout } = useAuthenticate()

    useEffect(() => { 
        (async()=>{
            await handleLogout()
            return navigation.navigate('Routes', {screen: 'SignIn'})
        })()    
    }, [])

    return <View />     
}

export default SignOut