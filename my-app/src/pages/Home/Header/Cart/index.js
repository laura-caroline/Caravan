import React, { useEffect, useState } from 'react'
import ItemsCart from '../../../../components/ItemsCart/index'
import {useNavigation} from '@react-navigation/native'
import {useCheckOut} from '../../../../context/checkout'
import {useAuthenticate} from '../../../../context/authenticate'
import CheckoutStripe from './CheckoutStripe/index'

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
const Cart = ()=>{
    const [tripsOfUser, setTripsOfUser] = useState([])

    const {authenticate} = useAuthenticate()
    const {storagedTrips} = useCheckOut()
    const {profile: {idUser}} = useAuthenticate()
    const navigation = useNavigation()
    useEffect(()=>{
        if(storagedTrips){
            console.log(idUser)
            const findoutTripsOfUser = storagedTrips.filter((trip)=>{
                return trip.id_user === idUser
            })
            return setTripsOfUser(findoutTripsOfUser)
        }
    },[storagedTrips])

    const handleNavigateSignIn = ()=>{
        return navigation.navigate('SignIn')
    }

    const handleNavigateHome = ()=>{
        return navigation.navigate('Home')
    }

    return(
        (authenticate ? ( 
            (tripsOfUser.length > 0 ? (
                <Container>
                    <ItemsCart/>
                    <BoxPrice>
                        <Button title="Realizar pagamento" onPress={()=> navigation.navigate('CheckoutStripe', {items: tripsOfUser})}/>
                    </BoxPrice>
                </Container>
            ):(
                <BoxEmptyTrips>
                    <TextEmpty>Não existem itens adicionados</TextEmpty>
                    <Button 
                        title="Ir para o inicio"
                        onPress={handleNavigateHome}
                    />
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