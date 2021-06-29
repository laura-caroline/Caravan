import React, {useState, useEffect} from 'react'
import ItemsCart from '../../../../components/ItemsCart/index'
import {withRouter} from 'react-router-dom'
import {useCheckOut} from '../../../../context/checkout'
import {useAuthenticate} from '../../../../context/authenticate'
import CheckoutStripe from './CheckoutStripe/index'
import {
    Container,
    BoxPrice,
    Button,
    TextEmpty,
    TextNotAuthenticate,
} from './styles'

const Cart = ({history})=>{
    const [tripsOfUser, setTripsOfUser] = useState([])

    const {
        authenticate, 
        isAdmin, 
        profile: {idUser, User}
    } = useAuthenticate()
    
    const { 
        showCheckOut, 
        storagedTrips
    } = useCheckOut()
    
    useEffect(()=>{   
        if(storagedTrips){
            const findoutTripsOfUser = storagedTrips.filter((trip)=>{
                return trip.id_user == idUser
            })
            return setTripsOfUser(findoutTripsOfUser)
        }
    },[storagedTrips])
    
    return(
        (authenticate ? ( 
            (tripsOfUser.length > 0 ? (
                <Container show={showCheckOut}>
                    <ItemsCart/>
                    <BoxPrice>
                        <CheckoutStripe items={tripsOfUser}/>
                    </BoxPrice>
                </Container>
            ):(
                <Container show={showCheckOut}>
                    <TextEmpty>Não existem items adicionados</TextEmpty>
                </Container>
            ))
        
           
        ):(
        <Container show={showCheckOut}>     
            <TextNotAuthenticate>
                Para você ver os items desejados que você selecionou é necessário fazer o login
            </TextNotAuthenticate>
         </Container>
          
        ))
        
    )
}
export default withRouter(Cart)