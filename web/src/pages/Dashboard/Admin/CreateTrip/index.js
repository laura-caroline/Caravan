import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import InputMask from 'react-input-mask'
import ClipLoader from "react-spinners/ClipLoader"
import Dropzone from '../../../../components/Dropzone/index'
import api from '../../../../config/api'
import { useAuthenticate } from '../../../../context/authenticate'
import { parsedTime } from '../../../../utils/parsedTime'
import { Formik, setIn } from 'formik'
import * as Yup from 'yup'
import {
    Container,
    BoxContent,
    Title,
    Form,
    BoxGroupSchedules,
    BoxGroupSelects,
    BoxInclusion,
    Inclusion,
    BoxList,
    BoxNotInclusion,
    NotInclusion,
    BoxSchedule,
    Buttom,
    Input,
    Link,
    Item,
    Label,
    Option,
    Select,
    ErrorMessage,
    BoxUf,
    BoxCity,
    ButtonAdd
} from '../../../../components/styles-create-trip'

const CreateTrip = ({ history }) => {

    const [loading, setLoading] = useState(false)
    const [include, setInclude] = useState('')
    const [selectedUf, setSelectedUf] = useState('')
    const [notInclude, setNotInclude] = useState('')
    const [citys, setCitys] = useState([])
    const [ufs, setUfs] = useState([])
    const { profile: { User, hierarchy } } = useAuthenticate()

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
        (async () => {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const data = await response.json()
            const modifiedUfs = data.map((uf) => {
                return { sigla: uf.sigla, nome: uf.nome }
            })
            return setUfs(modifiedUfs)

        })()
    }, [])
    useEffect(() => {
        (async () => {
            if (selectedUf) {
                const findoutUf = ufs.find((uf) => {
                    return uf.nome == selectedUf
                })
                const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${findoutUf.sigla}/municipios`)
                const data = await response.json()
                const modifiedCitys = data.map((county) => {
                    return county.nome
                })
                const ordenedCitys = modifiedCitys.sort()
                return setCitys(ordenedCitys)
            }
        })()
    }, [selectedUf])

    const handleBackPageDashboard = () => {
        return history.push(`/user/${User}/${hierarchy}`)
    }

    const submitForm = async (values, setFieldError) => {
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
        setLoading(true)

        formData.append('city', city)
        formData.append('images_attraction', image)
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
            return history.push(`/user/${User}/passeios`)
        }
        setLoading(false)
        return setFieldError('days_disponibles', data.error)
    }
    return (
        <Container>
            <BoxContent>
                <Title>Adicione suas atrações</Title>
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
                    {({ values, errors, setFieldValue, handleChange, handleSubmit }) => (
                        
                        <Form>
                            <Dropzone callbackSelectedFile={(image) => setFieldValue('image', image)} />
                            <ErrorMessage>
                                {errors.image && errors.image}
                            </ErrorMessage>
                            <BoxGroupSelects>
                                <BoxUf>
                                    <Select name="uf" onChange={(e) => {
                                        setSelectedUf(e.target.value)
                                        setFieldValue('uf', e.target.value)
                                    }}>
                                        <Option value="">
                                            Selecione o estado 
                                        </Option>
                                        {ufs.length > 0 && ufs.map((uf) => {
                                            return <Option value={uf.nome}>{uf.nome}</Option>
                                        })}

                                    </Select>
                                    <ErrorMessage>
                                        {errors.uf && errors.uf}
                                    </ErrorMessage>
                                </BoxUf>
                                <BoxCity>
                                    <Select name="city" onChange={handleChange}>
                                        <Option value="">
                                            Selecione a cidade
                                        </Option>
                                        {citys.map((city) => {
                                            return <Option>{city}</Option>
                                        })}
                                    </Select>
                                    <ErrorMessage>
                                        {errors.city && errors.city}
                                    </ErrorMessage>
                                </BoxCity>

                            </BoxGroupSelects>
                            <Label htmlFor="name">Nome da atração</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    onChange={handleChange}
                                />
                                <ErrorMessage>
                                    {errors.name && errors.name}
                                </ErrorMessage>
                            <Label htmlFor="duration">Duração da atração</Label>
                                <InputMask
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        boxSizing: "border-box"
                                    }}
                                    id="duration"
                                    name="duration"
                                    mask="99:99"
                                    onChange={handleChange}
                                />
                                <ErrorMessage>
                                    {errors.duration && errors.duration}
                                </ErrorMessage>
                            <Label htmlFor="value">Valor da atração por pessoa</Label>
                                <Input
                                    id="value"
                                    name="value"
                                    onChange={handleChange}
                                />
                                <ErrorMessage>
                                    {errors.value && errors.value}
                                </ErrorMessage> 
                            <Label>Inclui na viagem:</Label>
                            <BoxInclusion>
                                <Inclusion>
                                    <Input
                                        value={include}
                                        style={{ border: 'none' }}
                                        placeholder="Digite oque inclui no passeio"
                                        onChange={(e) => setInclude(e.target.value)}

                                    />
                                    <ButtonAdd 
                                        onClick={() =>{
                                            setInclude('')
                                            return setFieldValue('trips_includes',[
                                                ...values.trips_includes, 
                                                {name: include}
                                            ])
                                        }}> 
                                        +
                                    </ButtonAdd>
                                </Inclusion>
                            </BoxInclusion>
                            <BoxList>
                                <ErrorMessage>
                                    {errors.trips_includes && errors.trips_includes}
                                </ErrorMessage>

                                {values.trips_includes.length > 0 && values.trips_includes.map((include) => {
                                    return (
                                        <Item
                                            onClick={() => {
                                                const deleteInclude = values.trips_includes.filter((item) => {
                                                    return item.name != include.name
                                                })
                                                return setFieldValue('trips_includes', deleteInclude)
                                            }}
                                        >
                                            {include.name}
                                        </Item>
                                    )
                                })}
                            </BoxList>
                            <Label>Não inclui na viagem:</Label>
                            <BoxNotInclusion>
                                <NotInclusion>
                                    <Input
                                        value={notInclude}
                                        style={{ border: 'none' }}
                                        placeholder="Digite oque não inclui no passeio"
                                        onChange={(e) => setNotInclude(e.target.value)}
                                    />
                                    <ButtonAdd
                                        onClick={() => {
                                            setNotInclude('')
                                            return setFieldValue('trips_not_includes', [
                                                ...values.trips_not_includes, 
                                                { name: notInclude }
                                            ])
                                        }}>
                                        +
                                    </ButtonAdd>
                                </NotInclusion>
                            </BoxNotInclusion>
                            <BoxList>
                                <ErrorMessage>
                                    {errors.trips_not_includes && errors.trips_not_includes}
                                </ErrorMessage>

                                {values.trips_not_includes.length > 0 && values.trips_not_includes.map((notInclude) => {
                                    return (
                                        <Item
                                            onClick={() => {
                                                const filteredNotIncludes = values.trips_not_includes.filter((item) => {
                                                    return item.name != notInclude.name
                                                })
                                                return setFieldValue('trips_not_includes', filteredNotIncludes)
                                            }}
                                        >
                                            {notInclude.name}
                                        </Item>
                                    )
                                })}
                            </BoxList>

                            <Label>Horarios disponiveis:</Label>
                            <BoxGroupSchedules>
                                <BoxSchedule>
                                    <InputMask
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            boxSizing: "border-box"
                                        }}
                                        name="schedule_initial"
                                        alwaysShowMask={false}
                                        mask="99:99"
                                        onChange={handleChange}

                                    />
                                    <ErrorMessage>
                                        {errors.schedule_initial && errors.schedule_initial}
                                    </ErrorMessage>

                                </BoxSchedule>
                                <BoxSchedule>
                                    <InputMask
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            boxSizing: "border-box"
                                        }}
                                        name="schedule_end"
                                        alwaysShowMask={false}
                                        mask="99:99"
                                        onChange={handleChange}
                                    />
                                    <ErrorMessage>
                                        {errors.schedule_end && errors.schedule_end}
                                    </ErrorMessage>
                                </BoxSchedule>
                            </BoxGroupSchedules>
                            <Label>Dias disponiveis</Label>
                            <Select 
                                onChange={(e) => {
                                    return setFieldValue('days_disponibles', [
                                        ...values.days_disponibles, 
                                        {day: e.target.value}
                                    ])
                                }}
                            >
                                
                                <Option value=''> Selecione os dias disponiveis</Option>
                                <Option> Domingo</Option>
                                <Option> Segunda-feira</Option>
                                <Option> Terça-feira</Option>
                                <Option> Quarta-feira</Option>
                                <Option> Quinta-feira</Option>
                                <Option> Sexta-feira</Option>
                                <Option> Sábado</Option>
                            </Select>
                            <BoxList>
                                <ErrorMessage>
                                    {errors.days_disponibles && errors.days_disponibles}
                                </ErrorMessage>

                                {values.days_disponibles.length > 0 && values.days_disponibles.map((day) => {
                                    return (
                                        <Item
                                            onClick={() => {
                                                const filteredDays = values.days_disponibles.filter((item) => {
                                                    return item.day != day.day
                                                })
                                                return setFieldValue('days_disponibles', filteredDays)
                                            }}
                                        >
                                            {day.day}
                                        </Item>
                                    )
                                })}
                            </BoxList>
                            <Buttom onClick={handleSubmit}>
                                {loading ? (
                                    <ClipLoader
                                        loading={loading}
                                        size="15"
                                        color="white"
                                    />
                                ) : (
                                        'Enviar'
                                    )}
                            </Buttom>
                            <Link onClick={handleBackPageDashboard}>Voltar para a página principal</Link>
                        </Form>
                    )}
                </Formik>
            </BoxContent>
        </Container>
    )
}
export default withRouter(CreateTrip)