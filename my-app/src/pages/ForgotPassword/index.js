import React  from 'react'
import api from '../../config/api'
import { Formik } from 'formik'
import * as Yup from 'yup'
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
    
    const FormSchema = Yup.object().shape({
        email: Yup
            .string()
            .matches(/^(\w+)\@(\w+)(\W+\w+)+/, "Email invalido")
            .required('Campo obrigatório')
        ,
    })

    const submitForm = async (values, setFieldError) => {
        const response = await api.post('user/auth/email', values)
        const data = response.data

        if (response.status === 200) {
            console.log('Quase lá... verifique sua caixa de entrada')
        }
        return setFieldError('email', data.error)
    }

    return (
        <Container>
            <BoxContent>
                <Content style={{ marginTop: 80 }}>
                    <Formik
                        initialValues={{
                            email: '',
                        }}
                        validationSchema={FormSchema}
                        onSubmit={async (values, { setFieldError }) => {
                            return submitForm(values, setFieldError)
                        }}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            errors
                        }) => (
                        <>
                            <Label>Email:</Label>
                            <Input
                                placeholder="Digite seu email cadastrado"
                                autoCapitalize="none"
                                onChangeText={handleChange('email')}
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
