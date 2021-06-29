import React, { useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker'
import {useNavigation} from '@react-navigation/native'
import {TextInputMask} from 'react-native-masked-text'
import {ActivityIndicator, Text, StyleSheet} from 'react-native'
import api from '../../../../config/api'
import {useAuthenticate} from '../../../../context/authenticate'
import {parsedTime} from '../../../../utils/parsedTime'
import {useRoute} from '@react-navigation/native'

import { 
    Container,
    BoxContent,
    Title,
    BoxForm,
    BoxGroupSchedules,
    BoxInclusion,
    Inclusion,
    BoxList,
    BoxNotInclusion,
    NotInclusion,
    BoxSchedule,
    Button,
    Input,
    Link,
    Item,
    Label,
    AddItem,
    ErrorMessage,
    BoxLocal,
    Local,
    BoxNavigation
} from '../../../../components/styles-create-trip'
import ImageSelected from '../../../../components/ImagePicker/index'

const UpdateTrip = () => {
    
    //Datas and loading from api
    const [loading, setLoading] = useState(true)
    const [ufs, setUfs] = useState([])
    const [citys, setCitys] = useState([])
    // Datas from form
    const [formData, setFormData] = useState({})
    const [include, setInclude] = useState('')
    const [notInclude, setNotInclude] = useState('')
    const [errors, setErrors] = useState({})

    const {
        profile: {User, hierarchy}
    } = useAuthenticate()
    const navigation = useNavigation()
    const route = useRoute()
    
    useEffect(()=>{
        (async()=>{
            const {
                idTrip
            } = route.params
            
            const response  = await api.get(`/trip/${idTrip}`)
            const [{ data, schedule_end, schedule_initial, duration }] = response.data
            setLoading(false)
            return setFormData({ ...data, schedule_initial, schedule_end, duration })
         })()
     },[])

    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const data = await response.json()
            const modifiedUfs = data.map((uf) =>{
                return {sigla: uf.sigla, nome: uf.nome}
            })
            return setUfs(modifiedUfs)

        })()
    }, [])

    useEffect(() => {
        (async()=>{
            if(formData.uf){
                const findoutUf = ufs.find((uf)=>{
                    return uf.nome == formData.uf
                })
                const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${findoutUf.sigla}/municipios`)
                const data = await response.json()
                const modifiedCitys = data.map((county) => {
                    return county.nome
                })
                const ordenedCitys = modifiedCitys.sort()
                return setCountys(ordenedCitys)
            }
        })()        
    }, [formData.uf])

    const handleChange = (field, value) =>{
        return setFormData({...formData, [field]: value })
    }
    const handleChangeIncludes = ()=>{
        return setFormData({
            ...formData, 
            trips_includes: [
                ...formData.trips_includes,
                { name: include}
            ]
        })
    }
    const handleChangeNotIncludes = ()=>{
        return setFormData({
            ...formData, 
            trips_not_includes: [
                ...formData.trips_not_includes,
                {name: notInclude}
            ]
        })
    }
    const handleChangeDays = (value)=>{
        return setFormData({
            ...formData, 
            days_disponibles: [
                ...formData.days_disponibles,
                {day: value}
            ]
        })
    }
    const handleDeleteNotInclude = (value)=>{
        const {trips_not_includes} = formData
        const deleteNotInclude = trips_not_includes.filter((notInclude)=>{
                return notInclude.name !== value
        })  
        return setFormData({...formData, trips_not_includes: deleteNotInclude})
    }

    const handleDeleteInclude = (value)=>{
        const {trips_includes} = formData
        const deleteInclude = trips_includes.filter((include)=>{
             return include.name !== value
         })
         return setFormData({...formData, trips_includes: deleteInclude})
     }

     const handleDeleteDay = (day)=>{
        const {days_disponibles} = formData
        const deleteDay = days_disponibles.filter((item)=>{
            return item.day !== day
        })
        return setFormData({...formData, days_disponibles: deleteDay})
    }
    
    const handleBackPageDashboard = ()=>{
        return navigation.navigate('Passeios')
    }   
    const handleSubmit = async () => {
        setLoading(true)
        try{
            const valid = await FormSchema.validate(formData, {abortEarly: false})
        }
        catch(errors){
            const schemaErrors = errors.inner.map(err => {
                return {field: err.path, value : err.message}
            })
            const modifiedForUniqueObject = schemaErrors.reduce((obj, item) => ((obj[item.field] = item.value), obj),{});
            return setErrors(modifiedForUniqueObject)
        }
        
        const {
            city,
            name,
            days_disponibles,
            image,
            trips_includes,
            trips_not_includes,
            uf,
            value,
            duration,
            schedule_initial,
            schedule_end
        } = formData
        
        const form = new FormData()
        form.append('city', city)
        form.append('image', {name: `image.jpg`, type:"image/jpg", uri: image.uri})
        form.append('name', name)
        form.append('duration', parsedTime(duration))
        form.append('value', value)
        form.append('schedule_initial', parsedTime(schedule_initial))
        form.append('schedule_end', parsedTime(schedule_end))
        form.append('uf', uf)
        form.append('days_disponibles', JSON.stringify(days_disponibles))
        form.append('trips_includes', JSON.stringify(trips_includes))
        form.append('trips_not_includes', JSON.stringify(trips_not_includes))
        form.append('id_product', formData.id_product)
        form.append('id_price', formData.id_price)

        const response = await api.put(`/trip/${idTrip}`, form)
        const data = response.data 
        setLoading(false)

        if(response.status === 200){
            return navigation.navigate('Passeios')
        }
    }
    
    return (
        <>
        {!loading ? (
            <Container>
            <BoxContent>
                <BoxForm>
                    {!loading && (
                        <ImageSelected 
                            defaultImage={formData.image}
                            selectedImage={(image)=> handleChange('image', image)}
                        />
                    )}
                   
                    <ErrorMessage>
                        {errors.image && errors.image}
                    </ErrorMessage>
                    <Label>Nome do passeio</Label>
                        <Input
                            placeholder="Digite o nome do seu passeio"
                            value={formData.name}
                            onChangeText={(nameTrip)=> handleChange('name', nameTrip)}
                        />
                        <ErrorMessage>{errors.name && errors.name}</ErrorMessage>
                        <BoxLocal>
                            <Local>
                                <Picker 
                                    style={{width: '100%'}}
                                    selectedValue={formData.uf} 
                                    onValueChange={(uf)=> handleChange('uf', uf)}
                                > 
                                    <Picker.Item 
                                        label="Estado" 
                                        value=""
                                    />
                                    {ufs.length > 0 && ufs.map((uf)=>{
                                        return(
                                            <Picker.Item 
                                                label={uf.nome} 
                                                value={uf.nome}
                                            />
                                        )
                                    })}
                                </Picker>
                                <ErrorMessage>{errors.uf && errors.uf}</ErrorMessage>
                            </Local>
                            <Local>
                                <Picker 
                                    style={{width: '100%'}}
                                    selectedValue={formData.city?.name}
                                    onValueChange={(city)=> handleChange('city', city)}
                                >
                                    <Picker.Item 
                                        label="cidade" 
                                        value=""/>
                                    {citys.length > 0 && citys.map((city)=>{
                                        return(
                                            <Picker.Item 
                                                label={city}
                                                value={city}
                                            />
                                        )
                                    })}
                                </Picker>
                                <ErrorMessage>
                                    {errors.city && errors.city}
                                </ErrorMessage>
    
                            </Local>
                        </BoxLocal>
                        <Label>Duração da atração</Label>
                            <TextInputMask
                                style={styles.input}
                                type={'datetime'}
                                value={formData.duration}
                                options={{
                                    format: 'HH:mm'
                                }}
                                onChangeText={(duration)=> handleChange('duration', duration)}
                            />
                            <ErrorMessage>{
                                errors.duration && errors.duration}
                            </ErrorMessage>
    
                        <Label>Valor da atração por pessoa</Label>
                            <TextInputMask
                                style={styles.input}
                                type={"only-numbers"}
                                value={formData.value}
                                onChangeText={(value)=> handleChange('value', value)}
                            />
                            <ErrorMessage>
                                {errors.value && errors.value}
                            </ErrorMessage>
    
                        <Label>Inclui na viagem:</Label>
                            <BoxInclusion>
                                <Inclusion>
                                    <Input 
                                        style={{width: '90%', borderWidth: 0}}
                                        defaultValue={include}
                                        placeholder="Digite oque inclui na viagem"
                                        onChangeText={(include)=> setInclude(include)}
                                    />
                                    <AddItem 
                                        style={{width: '5%',}}
                                        onPress={()=>{
                                            handleChangeIncludes()
                                            setInclude('')

                                        }}
                                    >
                                        +
                                    </AddItem>
                                </Inclusion>
                            </BoxInclusion>
                            <BoxList>
                            <ErrorMessage>
                                {errors.trips_includes && errors.trips_includes}
                            </ErrorMessage>
                            {formData.trips_includes?.length > 0 && formData.trips_includes.map((include)=>{
                                return (
                                    <Item>
                                        <Text onPress={()=> handleDeleteInclude(include.name)}>
                                            {include.name}
                                        </Text>
                                    </Item>
                                )
                            })}
                            </BoxList>
                            <Label>Não inclui na viagem:</Label>
                            <BoxNotInclusion>
                                <NotInclusion>
                                    <Input
                                        style={{width: '90%', borderWidth: 0}}
                                        defaultValue={notInclude}
                                        placeholder="Digite oque não inclui na viagem"
                                        onChangeText={(notInclude)=> setNotInclude(notInclude)}
                                        
                                    />
                                    <AddItem
                                        style={{width: '5%'}}
                                        onPress={()=>{
                                            handleChangeNotIncludes()
                                            setNotInclude('')
                                        }}
                                    >
                                        +
                                    </AddItem>
                                </NotInclusion>
                            </BoxNotInclusion>
                            <BoxList>
                            <ErrorMessage>
                                {errors.trips_not_includes && errors.trips_not_includes}
                            </ErrorMessage>
    
                            {formData.trips_not_includes?.length > 0 && formData.trips_not_includes.map((notInclude)=>{
                                return (
                                    <Item>
                                        <Text onPress={()=> handleDeleteNotInclude(notInclude.name)}>
                                            {notInclude.name}
                                        </Text>
                                    </Item>
                                )
                            })}
                            </BoxList>
                            
                        <Label>Horarios disponiveis:</Label>
                        <BoxGroupSchedules>
                            <BoxSchedule>
                                <TextInputMask
                                    style={styles.input}
                                    type={'datetime'}
                                    options={{format: 'HH:mm'}}
                                    placeholder="Horario inicial"
                                    value={formData.schedule_initial}
                                    onChangeText={(schedule_initial)=> handleChange('schedule_initial', schedule_initial)}
                                />
                                <ErrorMessage>
                                    {errors.schedule_initial && errors.schedule_initial}
                                </ErrorMessage>
                                
                            </BoxSchedule>
                            <BoxSchedule>
                                <TextInputMask
                                    style={styles.input}
                                    type={'datetime'}
                                    options={{format: 'HH:mm'}}
                                    placeholder="Horario final"
                                    value={formData.schedule_end}
                                    onChangeText={(schedule_end)=> handleChange('schedule_end', schedule_end)}  
                                />
                                <ErrorMessage>
                                    {errors.schedule_end && errors.schedule_end}
                                </ErrorMessage>
                            </BoxSchedule>
                        </BoxGroupSchedules>
                        <Label>Dias disponiveis</Label>
                            <Picker 
                                onValueChange={(day)=> handleChangeDays(day)}
                                style={{width: '100%'}}
                            >
                                <Picker.Item value="" label="Selecione os dias disponiveis"/>
                                <Picker.Item value="Domingo" label="Domingo"/>
                                <Picker.Item value="Segunda-feira" label="Segunda-feira"/>
                                <Picker.Item value="Terça-feira" label="Terça-feira"/>
                                <Picker.Item value="Quarta-feira" label="Quarta-feira"/>
                                <Picker.Item value="Quinta-feira" label="Quinta-feira"/>
                                <Picker.Item value="Sexta-feira" label="Sexta-feira"/>
                                <Picker.Item value="Sábado" label="Sábado"/>
                            </Picker>
                        <BoxList>
                        <ErrorMessage>
                            {errors.days_disponibles && errors.days_disponibles}
                        </ErrorMessage>
                        {formData.days_disponibles?.length > 0 && formData.days_disponibles.map((day)=>{
                            return (
                                <Item>
                                    <Text onPress={()=> handleDeleteDay(day.day)}>
                                        {day.day}  
                                    </Text>
                                </Item>
                            )
                        })}
                        </BoxList>
                        <BoxNavigation>
                            <Button
                                title="Enviar"
                                onPress={handleSubmit}
                            />
                                
                            <Link onPress={handleBackPageDashboard}>
                                Voltar para a página principal
                            </Link>
                        </BoxNavigation>
                </BoxForm>
            </BoxContent>
            </Container>
        ):(
            <ActivityIndicator 
                animating={loading}
                size="large"
                color="gray"
            />        
        )}
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 5,
        padding: 15,
        borderStyle: "solid",
        borderColor: "gray",
        borderWidth: 1,
    }
})
export default UpdateTrip