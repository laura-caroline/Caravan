import React, { useState, useEffect} from 'react'
import {Picker} from '@react-native-picker/picker'
import {useNavigation} from '@react-navigation/native'
import {TextInputMask} from 'react-native-masked-text'
import {StyleSheet} from 'react-native'
import api from '../../../../config/api'
import {useAuthenticate} from '../../../../context/authenticate'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {Text} from 'react-native'
//** */
import {parsedTime} from '../../../../utils/parsedTime'

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

const CreateTrip = () => {
    const [loading, setLoading] = useState(false)
    const [ufs, setUfs] = useState([])
    const [selectedUf, setSelectedUf] = useState('')
    const [citys, setCitys] = useState([])
    const [include, setInclude] = useState('')
    const [notInclude, setNotInclude] = useState('')
    
    const {profile: {User, hierarchy}} = useAuthenticate()
    const navigation = useNavigation()

    const FormSchema = Yup.object().shape({
        name: Yup
            .string()
            .required('Campo obrigatório')
        ,
        uf: Yup
            .string()
            .required('Campo obrigatório')
        ,
        city: Yup
            .string()
            .required('Campo obrigatório')
        ,
        duration: Yup
            .string()
            .matches(/^(\d){2}\:(\d){2}/, "Formato valido: 99:99")
            .required('Campo obrigatório')
        ,
        value: Yup
            .number()
            .min(1, "Campo obrigatório")
            .required('Campo obrigatório')
        ,
        schedule_initial: Yup
            .string()
            .matches(/^(\d){2}\:(\d){2}/, "Formato valido: 99:99")
            .required('Campo obrigatório')
        ,
        schedule_end: Yup
            .string()
            .matches(/^(\d){2}\:(\d){2}/, "Formato valido: 99:99")
            .required('Campo obrigatório')
        ,
        trips_includes: Yup
            .array()
            .of(Yup.object().shape({
                name: Yup.string().required('Campo obrigatório')
            })
            )
            .min(1, 'Campo obrigatório')

        ,
        trips_not_includes: Yup
            .array()
            .of(Yup.object().shape({
                name: Yup.string().required('Campo obrigatório')
            })
            )
            .min(1, 'Campo obrigatório')
        ,
        days_disponibles: Yup
            .array()
            .of(Yup.object().shape({
                day: Yup.string().required('Campo obrigatório')
            })
            )
            .min(1, 'Campo obrigatório')
        ,
    })
    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const data = await response.json()
            const modifiedUfs = data.map((uf) =>{
                return {
                    sigla: uf.sigla, 
                    nome: uf.nome
            }})
            return setUfs(modifiedUfs)
        })()
    }, [])

    useEffect(() => {
        (async()=>{
            if(selectedUf){
                const findoutUf = ufs.find((uf)=>{
                    return uf.nome == selectedUf
                })
                const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${findoutUf.sigla}/municipios`)
                const data = await response.json()
                const modifiedCitys = data.map((city) => {
                    return city.nome
                })
                const ordenedCitys = modifiedCitys.sort()
                return setCitys(ordenedCitys)
            }
        })()        
    }, [selectedUf])
    
    const handleBackPageDashboard = ()=>{
        return navigation.navigate('Passeios')
    }   

    const submitForm = async (values, setFieldError) => {
        setLoading(true)
        const {
            image,
            name,
            value,
            duration,
            uf,
            city,
            trips_includes,
            trips_not_includes,
            days_disponibles,
            schedule_initial,
            schedule_end,
        } = values
        
        const formData = new FormData()
        formData.append('city', city)
        formData.append('image', {name: `image.jpg`, type:"image/jpg", uri: image.uri})
        formData.append('name', name)
        formData.append('duration', parsedTime(duration))
        formData.append('value', value)
        formData.append('schedule_initial', parsedTime(schedule_initial))
        formData.append('schedule_end', parsedTime(schedule_end))
        formData.append('uf', uf)
        formData.append('days_disponibles', JSON.stringify(days_disponibles))
        formData.append('trips_includes', JSON.stringify(trips_includes))
        formData.append('trips_not_includes', JSON.stringify(trips_not_includes))
        
        const response = await api.post('/trip', formData)
        const data = response.data

        if(response.status === 200){
            return navigation.navigate('Passeios')
        }
        setLoading(false)
        return setFieldError('days_disponibles', data.msg)
    }

    return (
        <Container>
        <BoxContent>
            <Title>Adicione suas atrações</Title>
            <BoxForm>
                <Formik
                    initialValues={{
                        image: {},
                        city: '',
                        uf: '',
                        name: '',
                        duration: '',
                        value: 0,
                        schedule_initial: '',
                        schedule_end: '',
                        trips_includes: [],
                        trips_not_includes: [],
                        days_disponibles: [],
                    }}
                    validationSchema={FormSchema}
                    onSubmit={({values, setFieldError}) => {
                        return submitForm(values, setFieldError)
                    }}
                >
                    {({values,handleChange,handleSubmit,errors, setFieldValue })=>(
                    <>
                        <ImageSelected 
                            selectedImage={(image)=> setFieldValue('image', image)}
                        />
                        <ErrorMessage>
                            {errors.image && errors.image}
                        </ErrorMessage>
                        <Label>Nome da atração</Label>
                            <Input
                                placeholder="Digite o nome do seu passeio"
                                onChangeText={handleChange('name')}
                            />
                            <ErrorMessage>
                                {errors.name && errors.name}
                            </ErrorMessage>
                        <BoxLocal>
                            <Local>
                                <Picker 
                                    style={{width: '100%'}}
                                    selectedValue={selectedUf} 
                                    onValueChange={(uf)=>{
                                        setSelectedUf(uf)
                                        return setFieldValue('uf', uf)
                                    }}
                                > 
                                    <Picker.Item 
                                        label="Estado" 
                                        value=""
                                    />
                                    {ufs.length > 0 && ufs.map((uf)=> {
                                        return(
                                            <Picker.Item 
                                                label={uf.nome} 
                                                value={uf.nome}
                                            />
                                        )
                                    })}
                                </Picker>
                                <ErrorMessage>
                                    {errors.uf && errors.uf}
                                </ErrorMessage>
                            </Local>
                            <Local>
                                <Picker 
                                    style={{width: '100%'}}
                                    selectedValue={values.city}
                                    onValueChange={handleChange('city')}
                                >
                                    <Picker.Item 
                                        label="Cidade"
                                         value=""
                                    />
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
                                options={{
                                    format: 'HH:mm'
                                }}
                                onChangeText={handleChange('duration')}
                            />
                            <ErrorMessage>
                                {errors.duration && errors.duration}
                            </ErrorMessage>

                        <Label>Valor da atração por pessoa</Label>
                            <TextInputMask
                                style={styles.input}
                                type={"only-numbers"}
                                onChangeText={handleChange('value')}
                            />
                            <ErrorMessage>
                                {errors.value && errors.value}
                            </ErrorMessage>

                        <Label>Inclui na viagem:</Label>
                            <BoxInclusion>
                                <Inclusion>
                                    <Input 
                                        style={{width: '90%', borderWidth: 0}}
                                        placeholder="Digite oque inclui no passeio"
                                        onChangeText={(include)=> setInclude(include)}
                                    />
                                    <AddItem 
                                        style={{width: '5%'}}
                                        onPress={()=> {
                                            setFieldValue('trips_includes', [
                                            ...values.trips_includes, 
                                            {name: include}
                                            ]
                                        )}
                                    }
                                    >
                                        +
                                    </AddItem>
                                </Inclusion>
                                
                            </BoxInclusion>
                            <BoxList>
                            <ErrorMessage>
                                {errors.trips_includes && errors.trips_includes}
                            </ErrorMessage>
                            {values.trips_includes.length > 0 && values.trips_includes.map((include)=>{
                                return (
                                    <Item>
                                        <Text 
                                            onPress={()=>{
                                                const deleteInclude = values.trips_includes.filter((item)=>{
                                                    return item.name != include.name
                                                })
                                                return setFieldValue('includes', deleteInclude)
                                            }}
                                        >
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
                                        style={{
                                            width: '90%', 
                                            borderWidth: 0
                                        }}
                                        placeholder="Digite oque não inclui no passeio"
                                        onChangeText={(notInclude)=> setNotInclude(notInclude)}
                                        
                                    />
                                    <AddItem
                                        style={{
                                            width: '5%'
                                        }}
                                        onPress={()=> {
                                            setFieldValue('trips_not_includes', [
                                                ...values.trips_not_includes, 
                                                {name: notInclude}
                                            ])
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
                            {values.trips_not_includes.length > 0 && values.trips_not_includes.map((notInclude)=>{
                                return (
                                    <Item>
                                        <Text 
                                            onPress={()=>{
                                                const deleteNotInclude = values.trips_not_includes.filter((item)=>{
                                                    return item.name != notInclude.name
                                                })
                                                return setFieldValue('trips_not_includes', deleteNotInclude)
                                            }}
                                        >
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
                                    options={{
                                        format: 'HH:mm'
                                    }}
                                    placeholder="Horario inicial"
                                    onChangeText={handleChange('schedule_initial')}
                                />
                                <ErrorMessage>
                                    {errors.schedule_initial && errors.schedule_initial}
                                </ErrorMessage>
                            </BoxSchedule>
                            <BoxSchedule>
                                <TextInputMask
                                    style={styles.input}
                                    type={'datetime'}
                                    options={{
                                        format: 'HH:mm'
                                    }}
                                    placeholder="Horario final"
                                    onChangeText={handleChange('schedule_end')}
                                />
                                <ErrorMessage>
                                    {errors.schedule_end && errors.schedule_end}
                                </ErrorMessage>
                            </BoxSchedule>
                        </BoxGroupSchedules>
                        <Label>Dias disponiveis</Label>
                            <Picker   
                                style={{width: '100%'}}
                                onValueChange={((day)=>{
                                    return setFieldValue('days_disponibles',[
                                        ...values.days_disponibles, 
                                        {day}
                                    ])
                                })}
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
                        {values.days_disponibles.length > 0 && values.days_disponibles.map((day)=>{
                            return (
                                <Item>
                                    <Text 
                                        onPress={()=>{
                                            const deleteDay = values.days_disponibles.filter((item)=>{
                                                return item.day != day.day
                                            })
                                            return setFieldValue('days', deleteDay)
                                        }}
                                    >
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
                        </>
                        )}
                </Formik>
            </BoxForm>
        </BoxContent>
        </Container>
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

export default CreateTrip