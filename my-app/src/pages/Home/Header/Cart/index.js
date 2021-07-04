import React, { useEffect, useState } from 'react'
import ItemsCart from '../../../../components/ItemsCart/index'
import {useNavigation} from '@react-navigation/native'
import {useCheckOut} from '../../../../context/checkout'
import {useAuthenticate} from '../../../../context/authenticate'
import CheckoutStripe from './CheckoutStripe/index'
import {View, StatusBar} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'


import {
    Container,
    BoxPrice,
    Button,
    BoxEmptyTrips,
    TextEmpty,
    BoxNotAuthenticate,
    TextNotAuthenticate,
    ButtonNotAuthenticate,
} from './styles'
import { ActivityIndicator } from 'react-native'
const Cart = ()=>{
    const [tripsOfUser, setTripsOfUser] = useState([])
    const [loading, setLoading] = useState(true)
    const {authenticate} = useAuthenticate()
    const {storagedTrips} = useCheckOut()
    const {profile: {idUser}} = useAuthenticate()
    const navigation = useNavigation()

    useEffect(()=>{
        if(storagedTrips){
            const findoutTripsOfUser = storagedTrips.filter((trip)=>{
                return trip.id_user === idUser
            })
            setTripsOfUser(findoutTripsOfUser)
            setLoading(false)
        }
    },[storagedTrips])

    const handleNavigateSignIn = ()=>{
        return navigation.navigate('SignIn')
    }
    return(
        (authenticate ? ( 
            (tripsOfUser.length > 0 ? (
                <Container>
                    <StatusBar barStyle="dark-content"/>
                    <Spinner
                        visible={loading}
                        textContent="Loading..."
                        textStyle={{color: '#FFF'}}
                    />
                    <View>
                        <ItemsCart/>
                        <BoxPrice>
                            <CheckoutStripe items={tripsOfUser}/>
                        </BoxPrice>
                    </View>
                    
                </Container>
            ):(
                <BoxEmptyTrips>
                    <TextEmpty>Não existem itens adicionados</TextEmpty>
                </BoxEmptyTrips>
            ))
            ):(
            <BoxNotAuthenticate>
                <TextNotAuthenticate>
                    Para você ver os items desejados que você selecionou é necessário fazer o login
                </TextNotAuthenticate>
                <ButtonNotAuthenticate 
                    title="Fazer login"
                    onPress={handleNavigateSignIn}
                />
            </BoxNotAuthenticate>
        
            
            ))
        
        )
       
}
export default Cart