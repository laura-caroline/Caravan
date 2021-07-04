import React, {useState, useEffect } from 'react'
import {Button, View, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
     BoxForm,
     Form,
     Input,
     BoxList,
} from './styles.js'


const Search = () => {
    const [ufs, setUfs] = useState([])
    const [citys, setCitys] = useState([])
    const [possiblesUfs, setPossiblesUfs] = useState([])
    const [possiblesCitys, setPossiblesCitys] = useState([])
    const [query, setQuery] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const data = await response.json()
            const modifiedUfs = data.map((uf)=>{
                return {
                    sigla: uf.sigla, 
                    nome: uf.nome
                }
            })
            return setUfs(modifiedUfs)

        })()
        
    }, [])
    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
            const data = await response.json()
            const modifiedCitys = data.map((city)=>{
                return {nome: city.nome}
            })
            return setCitys(modifiedCitys)
        })()
    }, [])

    const handleSelectedUf = (uf)=>{
        return navigation.navigate('ListTrips', {trip_uf: uf})
    }

    const handleSelectedCity = (city)=>{
        return navigation.navigate('ListTrips', {trip_city: city})
    }

    const handleQuery = ()=>{
        return navigation.navigate('ListTrips', {trip_query: query})
    }

    const handleChange = (search) => {
        setQuery(search)

        if(search.length <= 2){
            setPossiblesCitys([])
            return setPossiblesUfs([])
        }
        
        const strDefault = new RegExp(`^${search}`, 'i')
        const checkSearchIsUf = ufs.filter((uf)=> strDefault.test(uf.nome))
        const checkSearchIsCity = citys.filter((city) => strDefault.test(city.nome))
        setPossiblesCitys(checkSearchIsCity)
        setPossiblesUfs(checkSearchIsUf)
    }


    return (
        <BoxForm>
            <Form>
                <View style={{width: '100%', flexDirection: 'row', borderWidth: 1}}>
                    <Input
                        style={{width: '90%', borderWidth: 0}}
                        onChangeText={(v)=>handleChange(v)}
                    />
                    <TouchableOpacity onPress={handleQuery}>
                        <Icon 
                            size={30}
                            name="search"
                        />
                    </TouchableOpacity>
                </View>
                <BoxList>
                    {possiblesUfs.length > 0 && possiblesUfs.map((uf)=>{
                        return(
                            <Button
                                style={{position: 'absolute;'}}
                                title={uf.nome}
                                onPress={()=> handleSelectedUf(uf.nome)}

                            />
                        )
                    })}
                    {possiblesCitys.length > 0 && possiblesCitys.map((city)=>{
                        return(
                            <Button
                                title={city.nome}
                                onPress={()=> handleSelectedCity(city.nome)}
                            />
                        )
                    })}
                </BoxList>
                </Form>
            
        </BoxForm>
    )
}
export default Search

