import React, {useState} from 'react'
import ItemsCart from '../../../../components/ItemsCart/index'
import CheckoutStripe from '../../../Home/Header/Cart/CheckoutStripe/index'
import {useNavigation} from '@react-navigation/native'  
import {useCheckOut} from '../../../../context/checkout'
import {useAuthenticate} from '../../../../context/authenticate'

import{
    Container,
    BoxContent,
    BoxPrice,
    BoxEmpty,
    TextEmpty,
    ButtonBackHome
} from './styles'

const MyCart = ()=>{
    const [tripsOfUser, setTripsOfUser] = useState([])

    const {
        storagedTrips
    } = useCheckOut()
    const {
        profile: idUser
    } = useAuthenticate()
    const navigation = useNavigation()
    //** */
    useEffect(()=>{
        const findoutTripsOfUser = storagedTrips.filter((trip)=>{
            return trip.id_user === idUser
        })
        return setTripsOfUser(findoutTripsOfUser)
    },[])

    const handleNavigateHome = ()=>{
        return navigation.navigate('Home')
    }
    return (
        <>
        {tripsOfUser.length > 0 ?(
            <Container>
                <BoxContent>
                    <ItemsCart/>
                    <BoxPrice>
                        <CheckoutStripe items={tripsOfUser}/>
                    </BoxPrice>
                </BoxContent>
            </Container>
        ):(
            <BoxEmpty>
                <TextEmpty>Não existem passeios adicionados</TextEmpty>
                <ButtonBackHome 
                    title="Adicionar passeios no carrinho"
                    onPress={handleNavigateHome}
                />
                    
            </BoxEmpty>
        )}
        </>

       
    )
}   

export default MyCart