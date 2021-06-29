import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import api from '../../../config/api'
import ClipLoader from "react-spinners/ClipLoader"
import {MdDeleteForever, MdEdit, MdLibraryAdd} from 'react-icons/md'
import CreateTrip from './CreateTrip/index'
import { Dashboard } from '../index'
import {
    Container,
    BoxContent,
    BoxTrip,
    BoxListTrips,
    BoxDescriptionTrip,
    BoxGroupActions,
    Link,
    Image,
    Title,
    Text,
    
} from '../../../components/styles-list-trip'
import {
    BoxFilter,
    BoxFilters,
    Select,
    Option,
    Warning,
    BoxButtonsModal,
    BoxDescriptionModal,
    BoxModalDelete,
    ButtonCancel,
    ButtonDelete,
    SubTitleModal,
    TitleModal,
    Button
} from './styles'

const SettingTrips = (props) => {
    const [loading, setLoading] = useState(false)
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const [ufs, setUfs] = useState([])
    const [query, setQuery] = useState('')
    const [trips, setTrips] = useState([])
    const [redirect, setRedirect] = useState({create: false, edit: false})
    const [idTripDelete, setIdTripDelete] = useState()
    
    const {user} = useParams()
    console.log(user)
    // Pegar os dados da API de estados uma úncia vez
    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
            const data = await response.json()
            const modifiedUfs = data.map((uf)=>{
                return {sigla: uf.sigla, nome: uf.nome}
            })
            return setUfs(modifiedUfs)
        })()
    }, [])

    useEffect(() => {
        (async()=>{
            setLoading(true)
            const response = await api.get(`/trip?q=${query}`)
            const data = response.data
            setLoading(false)
            setRedirect(false)
            return setTrips(data)
        })()
    },[query])
    
    const handleChange = (event) => {
        const {value} = event.target
        setQuery(value)
    }
    
    const handleDeleteTrip = async ()=>{
        setLoading(true)
        const response = await api.delete(`/trip/${idTripDelete}`)
        const data = response.data
        setLoading(false)
        await window.location.reload()
                             
    }
    return (
        <Container>
            <Dashboard/>
            <BoxContent>
                <BoxFilters>
                    <BoxFilter>
                        <Select onChange={handleChange}>
                            <Option value=''>Escolha seu estado</Option>
                                {ufs.length > 0 && ufs.map((item)=>{
                                    return(
                                        <Option value={item.nome}>
                                            {item.nome}
                                        </Option>
                                    )
                                })}
                        </Select>
                        <Button onClick={()=> setRedirect({...redirect, create: true})}>
                            Adicione suas atrações <MdLibraryAdd size='30px'/>
                        </Button>
                    </BoxFilter>
                </BoxFilters>
        
                {redirect.create === true && <CreateTrip/>}

                <BoxListTrips>
                {trips.length > 0 && redirect === false && trips.map((trip)=>{
                    return(
                        <BoxTrip>
                            <Image src={trip.data.image}/>
                            <BoxDescriptionTrip>
                                <Title>
                                    {trip.data.name} - {trip.data.uf}
                                </Title>
                                <Text>
                                    Horario disponivel: {trip.schedule_initial} até as {trip.schedule_end}
                                </Text>
                                <Text>Duração: {trip.duration} horas</Text>
                                <Text>Valor: {trip.data.value} R$</Text>                                
                            </BoxDescriptionTrip>
                            <BoxGroupActions>
                                <Link href={`/user/${user}/editar/${trip.data.id}`}>
                                    <MdEdit size='30px'/>
                                </Link>
                                <Link onClick={()=>{
                                    setIdTripDelete(trip.data.id)
                                    setModalIsVisible(!modalIsVisible)
                                }}>
                                    <MdDeleteForever size='30px'/>
                                </Link>
                            </BoxGroupActions>
                            
                        </BoxTrip>
                        
                    )
                })}
                <BoxModalDelete isVisible={modalIsVisible}>
                    <BoxDescriptionModal>
                        <TitleModal>DELETAR</TitleModal>
                        <SubTitleModal>Deseja mesmo deletar?</SubTitleModal>
                    </BoxDescriptionModal>
                    <BoxButtonsModal>
                        <ButtonCancel 
                            onClick={()=> setModalIsVisible(false)}
                        >
                            Cancelar
                        </ButtonCancel>
                        <ButtonDelete 
                            onClick={handleDeleteTrip}
                        >
                            DELETAR
                            <ClipLoader loading={loading} size="15"/>
                        </ButtonDelete>
                    </BoxButtonsModal>
                </BoxModalDelete>
            </BoxListTrips>
            <Warning>{trips.length === 0 && loading === false && 'Não há atrações neste local'}</Warning>
        </BoxContent>

        </Container>
)
}
export default SettingTrips