import React, {useState, useEffect} from 'react'
import {Dashboard} from '../../index'
import {MdRoom} from 'react-icons/md'
import api from '../../../../config/api'
import {useAuthenticate} from '../../../../context/authenticate'

import {
    BoxButton,
    BoxContent,
    BoxDescription,
    BoxGroupButtons,
    BoxPrice,
    BoxTrip,
    BoxTrips,
    LinkInformation,
    Container,
    Image,
    Input,
    Label,
    Local,
    Option,
    PriceTrip,
    Select,
    Title,
    WarningEmptyTrips   
} from './styles'

const MyTripsBuyed = (props) => {
    const [trips, setTrips ] = useState([])
    const {profile: {idUser}} = useAuthenticate()

    useEffect(()=>{
        (async ()=>{
            const response = await api.get(`/payment/${idUser}`)
            const data = response.data  
            return setTrips(data)
        })()
    }, [])

    return (
        <Container>
            <Dashboard/>
            <BoxContent>
                <Title>Minhas viagens</Title>
                <BoxTrips>
                {trips.length > 0 && trips.map((item)=>{
                    return(
                        <BoxTrip>
                            <Image src={item.payment.order?.trip.image} />
                            <BoxDescription> 
                                <Local>
                                    <MdRoom/>Local: {item.payment.order.trip.name}
                                </Local>
                                <BoxGroupButtons>
                                    <BoxButton>
                                        <Label>DATA</Label>
                                        <Input 
                                            value={item.date} 
                                            disabled
                                        />
                                    </BoxButton>
                                    <BoxButton style={{width: '60%'}}>
                                        <Label>HORARIO</Label>
                                        <Select disabled>
                                            <Option >
                                                {item.schedule_initial} at?? as {item.schedule_end}
                                            </Option> 
                                        </Select>
                                    </BoxButton>
                                    <BoxButton>
                                        <Label>PESSOA(s)</Label>
                                        <Input 
                                            value={item.payment.order.numbers_people}
                                            disabled
                                        />
                                    </BoxButton>
                            </BoxGroupButtons> 
                        </BoxDescription>
                        <BoxPrice>
                            <PriceTrip>
                                Pre??o: R$ {item.payment.value}
                            </PriceTrip>
                            <LinkInformation href={`/trip/${item.payment.order.trip.id}`}>
                                Mais Informa????es
                            </LinkInformation>
                        </BoxPrice>
                    </BoxTrip> 
                    ) 
                })}
                </BoxTrips>
                {trips.length === 0 && (
                    <WarningEmptyTrips>
                        N??o h?? nenhuma passeio que voc?? efetuou o pagamento
                    </WarningEmptyTrips>
                )}            
            </BoxContent>
        </Container>
    )
}
export default MyTripsBuyed


