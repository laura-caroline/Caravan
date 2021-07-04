import React, {useEffect, useState} from 'react'
import api from '../../config/api'
import {useNavigation} from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {Alert} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import {
    Container,
    BoxContent,
    Content,
    Title,
    Input,
    Label,
    Button,
    MessageError,

} from '../../components/styles-form'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    const navigation = useNavigation()

    const FormSchema = Yup.object().shape({
        email: Yup
            .string()
            .matches(/^(\w+)\@(\w+)(\W+\w+)+/, "Email invalido")
            .required('Campo obrigatório')
        ,
    })

    useEffect(()=>{
        const unsubscribe = navigation.addListener('blur', ()=>{
            setEmail('')
        })
    },[])

    const submitForm = async (values) => {
        setLoading(true)
        const response = await api.post('user/auth/email', values)
        const data = response.data

        if (response.status === 200) {
            setLoading(false)
            return Alert.alert('Sucess', 'Quase lá... verifique sua caixa de entrada')
        }
        setLoading(false)
        return Alert.alert('Error', data.error)
    }

    return (
        <Container>
            <BoxContent>
                <Content style={{ marginTop: 80 }}>
                    <Spinner
                        visible={loading}
                        textContent="Loading..."
                        textStyle={{color: '#FFF'}}
                    />
                    <Formik
                        initialValues={{
                            email,
                        }}
                        validationSchema={FormSchema}
                        onSubmit={async (values) => {
                            return await submitForm(values)
                        }}
                    >
                        {({handleSubmit,errors}) => (
                        <>
                            <Label>Email:</Label>
                            <Input
                                value={email}
                                placeholder="Digite seu email cadastrado"
                                autoCapitalize="none"
                                onChangeText={(email)=> setEmail(email)}
                            />
                            <MessageError>
                                {errors.email && errors.email}
                            </MessageError>
                            <Button
                                title='Enviar'
                                onPress={handleSubmit}
                            />
                        </>
                        )}
                    </Formik>
                </Content>
            </BoxContent>
        </Container>
    )
}
export default ForgotPassword
