import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader"
import Dropzone from '../../../../components/Dropzone/index'
import api from '../../../../config/api'
import InputMask from 'react-input-mask'
import { useAuthenticate } from '../../../../context/authenticate'
import { parsedTime } from '../../../../utils/parsedTime'
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
    BoxCity,
    BoxUf,
    ButtonAdd
} from '../../../../components/styles-create-trip'



const UpdateTrip = ({ history }) => {
    //Datas and loading from api
    const [loading, setLoading] = useState(true)
    const [ufs, setUfs] = useState([])
    const [citys, setCitys] = useState([])
    const [formData, setFormData] = useState([])
    const [include, setInclude] = useState('')
    const [notInclude, setNotInclude] = useState('')
    const [errors, setErrors] = useState({})
    const { profile: { User, hierarchy } } = useAuthenticate()
    const { user, id } = useParams()

    useEffect(() => {
        (async () => {
            const response = await api.get(`/trip/${id}`)
            const [{ data, schedule_end, schedule_initial, duration }] = response.data
            setLoading(false)
            return setFormData({ ...data, schedule_initial, schedule_end, duration })

        })()
    }, [])

    useEffect(() => {
        (async () => {
            const getUfs = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const data = await getUfs.json()
            const modifiedUfs = data.map((uf) => {
                return { nome: uf.nome, sigla: uf.sigla }
            })
            return setUfs(modifiedUfs)
        })()

    }, [])

    useEffect(() => {
        (async () => {
            if (formData.uf && ufs.length > 0) {
                const findoutSiglaUf = ufs.find((uf) => {
                    return uf.nome == formData.uf
                })
                const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${findoutSiglaUf.sigla}/municipios`)
                const data = await response.json()
                const modifiedCitys = data.map((city) => {
                    return city.nome
                })
                const ordenedCitys = modifiedCitys.sort()
                return setCitys(ordenedCitys)
            }
        })()
    }, [ufs])

    const handleChange = (event) => {
        const { 
            value, 
            name 
        } = event.target
        return setFormData({ ...formData, [name]: value })
    }

    const handleChangeIncludes = () => {
        const {trips_includes} = formData
        return setFormData({
            ...formData,
            trips_includes: [
                ...formData.trips_includes,
                { name: include }
            ]
        })
    }

    const handleChangeNotIncludes = () => {
        return setFormData({
            ...formData,
            trips_not_includes: [
                ...formData.trips_not_includes,
                { name: notInclude }
            ]
        })
    }

    const handleChangeDays = (event) => {
        return setFormData({
            ...formData,
            days_disponibles: [
                ...formData.days_disponibles,
                { day: event.target.value }
            ]
        })
    }

    const handleDeleteNotInclude = (value) => {
        const { trips_not_includes } = formData
        const deleteNotInclude = trips_not_includes.filter((notInclude) => {
            return notInclude.name !== value
        })
        return setFormData({ ...formData, trips_not_includes: deleteNotInclude })
    }

    const handleDeleteInclude = (value) => {
        const { trips_includes } = formData
        const deleteInclude = trips_includes.filter((include) => {
            return include.name !== value
        })
        return setFormData({ ...formData, trips_includes: deleteInclude })
    }

    const handleDeleteDay = (day) => {
        const { days_disponibles } = formData
        const deleteDay = days_disponibles.filter((item) => {
            return item.day !== day
        })
        return setFormData({ ...formData, days_disponibles: deleteDay })
    }

    const handleBackPageDashboard = () => {
        if (hierarchy === 'admin') {
            return history.push(`/user/${User}/passeios`)
        }
        return history.push(`/user/${User}/meus-passeios`)

    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const valid = await FormSchema.validate(formData, { abortEarly: false })
        }
        catch (errors) {
            setLoading(false)
            const schemaErrors = errors.inner.reduce((obj, item) => ((obj[item.path] = item.message), obj), {});
            return setErrors(schemaErrors)
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
        form.append('image', image)
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

        const response = await api.put(`/trip/${id}`, form)
        const data = response.data
        setLoading(false)

        if(response.status === 200){
            if (hierarchy === 'admin') {
               return history.push(`/user/${User}/passeios`)
            }
            else {
               return history.push(`/user/${User}/meus-passeios`)
            }
        }
        

    }
    return (
        <Container>
            <BoxContent>
                <Title>Edite suas atrações</Title>
                <Form>
                    {formData.image && (
                        <Dropzone
                            defaultImage={!loading && formData.image}
                            callbackSelectedFile={(image) => setFormData({ ...formData, image })}
                        />
                    )}
                    <ErrorMessage>
                        {errors.image && errors.image}
                    </ErrorMessage>
                    <BoxGroupSelects>
                        <BoxUf>
                            <Select name="uf" value={formData.uf} onChange={handleChange}>
                                <Option >Selecione o estado</Option>
                                {ufs.length > 0 && ufs.map((uf) => {
                                    return <Option>{uf.nome}</Option>
                                })}
                            </Select>
                            <ErrorMessage>
                                {errors.uf && errors.uf}
                            </ErrorMessage>
                        </BoxUf>
                        <BoxCity>
                            <Select name="city" value={formData.city?.name} onChange={handleChange}>
                                <Option >Selecione a cidade</Option>
                                {citys.length > 0 && citys.map((city) => {
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
                            value={formData.name}
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
                                boxSizing: 'border-box'
                            }}
                            id="duration"
                            name="duration"
                            mask="99:99"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                        <ErrorMessage>
                            {errors.duration && errors.duration}
                        </ErrorMessage>

                    <Label htmlFor="value">Valor do passeio por pessoa</Label>
                        <Input
                            id="value"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                        />
                        <ErrorMessage>
                            {errors.value && errors.value}
                        </ErrorMessage>


                    <Label>A viagem inclui:</Label>
                    <BoxInclusion>
                        <Inclusion>
                            <Input
                                style={{ border: 'none' }}
                                value={include}
                                onChange={(e) => setInclude(e.target.value)}
                                placeholder="Digite oque inclui no passeio"
                            />
                            <ButtonAdd onClick={handleChangeIncludes}>
                                +
                            </ButtonAdd>
                        </Inclusion>
                    </BoxInclusion>
                    <BoxList>
                        <ErrorMessage>
                            {errors.trips_includes && errors.trips_includes}
                        </ErrorMessage>
                        {formData.trips_includes?.length > 0 && formData.trips_includes.map((include) => {
                            return (
                                <Item onClick={() => handleDeleteInclude(include.name)}>
                                    {include.name}
                                </Item>
                            )
                        })}
                    </BoxList>
                    <Label>A viagem não inclui</Label>
                    <BoxNotInclusion>
                        <NotInclusion>
                            <Input
                                style={{
                                    width: '100%',
                                    border: 'none'
                                }}
                                value={notInclude}
                                onChange={(e) => setNotInclude(e.target.value)}
                                placeholder="Digite oque não inclui no passeio"
                            />
                            <ButtonAdd onClick={handleChangeNotIncludes}>
                                +
                            </ButtonAdd>
                        </NotInclusion>
                    </BoxNotInclusion>
                    <BoxList>
                        <ErrorMessage>
                            {errors.trips_not_includes && errors.trips_not_includes}
                        </ErrorMessage>
                        {formData.trips_not_includes?.length > 0 && formData.trips_not_includes.map((notInclude) => {
                            return (
                                <Item onClick={() => handleDeleteNotInclude(notInclude.name)}>
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
                                    boxSizing: 'border-box'
                                }}
                                name="schedule_initial"
                                placeholder="Horario inicial"
                                mask="99:99"
                                value={formData.schedule_initial}
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
                                    boxSizing: 'border-box'
                                }}
                                name="schedule_end"
                                placeholder="Final"
                                mask="99:99"
                                value={formData.schedule_end}
                                onChange={handleChange}
                            />
                            <ErrorMessage>{errors.schedule_end && errors.schedule_end}</ErrorMessage>
                        </BoxSchedule>
                    </BoxGroupSchedules>
                    <Label>Dias disponiveis</Label>
                    <Select onChange={handleChangeDays}>
                        <Option value=''>Selecione os dias disponiveis</Option>
                        <Option>Segunda-feira</Option>
                        <Option>Terça-feira</Option>
                        <Option>Quarta-feira</Option>
                        <Option>Quinta-feira</Option>
                        <Option>Sexta-feira</Option>
                        <Option>Sábado</Option>
                        <Option>Domingo</Option>
                    </Select>
                    <BoxList>
                        <ErrorMessage>
                            {errors.days_disponibles && errors.days_disponibles}
                        </ErrorMessage>

                        {formData.days_disponibles?.length > 0 && formData.days_disponibles.map((item) => {
                            return (
                                <Item onClick={() => handleDeleteDay(item.day)}>
                                    {item.day}
                                </Item>
                            )
                        })}
                    </BoxList>
                    <Buttom onClick={handleSubmit}>
                        {loading ? (
                            <ClipLoader
                                loading={loading}
                                size='15'
                                color='white'
                            />
                        ) : (
                                'Enviar'
                            )}
                    </Buttom>
                    <Link onClick={handleBackPageDashboard}>
                        Voltar para página principal
                </Link>
                </Form>


            </BoxContent>
        </Container>

    )
}
export default withRouter(UpdateTrip)