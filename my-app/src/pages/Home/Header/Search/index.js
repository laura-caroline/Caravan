import React, {useState, useEffect } from 'react'
import {Button, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {
     BoxForm,
     Form,
     Input,
     BoxList,
} from './styles.js'


const Search = () => {
    const [ufs, setUfs] = useState([])
    const [countys, setCountys] = useState([])
    const [possiblesUfs, setPossiblesUfs] = useState([])
    const [possiblesCountys, setPossiblesCountys] = useState([])

    const navigation = useNavigation()
    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const data = await response.json()
            const modifiedUfs = data.map((uf)=>{
                return {sigla: uf.sigla, nome: uf.nome}
            })
            return setUfs(modifiedUfs)

        })()
        
    }, [])
    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
            const data = await response.json()
            const modifiedCountys = data.map((county)=>{
                return {nome: county.nome}
            })
            return setCountys(modifiedCountys)
        })()
    }, [])
    const handleSelectedUf = (uf)=>{
        return navigation.navigate('ListTrips', {trip_uf: uf})
    }
    const handleSelectedCounty = (county)=>{
        return navigation.navigate('ListTrips', {trip_county: county})
    }
    const handleChange = (search) => {
        if(search.length <= 2){
            setPossiblesCountys([])
            return setPossiblesUfs([])
        }
        
        const strDefault = new RegExp(`^${search}`, 'i')
        const checkSearchIsUf = ufs.filter((uf)=> strDefault.test(uf.nome))
        const checkSearchIsCounty = countys.filter((county) => strDefault.test(county.nome))
        
        setPossiblesCountys(checkSearchIsCounty)
        setPossiblesUfs(checkSearchIsUf)
    }
    return (
        <BoxForm>
            <Form>
                <Input
                    onChangeText={(v)=>handleChange(v)}
                />
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
                    {possiblesCountys.length > 0 && possiblesCountys.map((county)=>{
                        return(
                            <Button
                                title={county.nome}
                                onPress={()=> handleSelectedCounty(county.nome)}
                            />
                        )
                        
                    })}
                </BoxList>
                </Form>
            
        </BoxForm>
    )
}
export default Search

