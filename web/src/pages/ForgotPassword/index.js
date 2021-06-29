import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader"
import api from '../../config/api'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
    Container,
    Form,
    Label,
    Input,
    Button,
    Link,
    Title,
    Subtitle,
    ErrorMessage
} from '../../components/styles-form'
import { withRouter } from 'react-router-dom'


const ForgotPassword = ({ history }) => {
    const [loading, setLoading] = useState(false)

    const FormSchema = Yup.object().shape({
        email: Yup
            .string()
            .matches(/^(\w+)\@(\w+)(\W+\w+)+/, "Email invalido")
            .required('Campo obrigatório')
        ,
    })

    const handleNavigateLogin = () => {
        return history.push('entrar')
    }

    const submitForm = async (values, setFieldError) => {
        const response = await api.post('user/auth/email', values)
        const data = response.data

        if(response.status === 200){
            console.log('Verifique sua caixa de mensagem')
        }
        return setFieldError('email', data.error)
    }
    return (
        <Container>
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={FormSchema}
                onSubmit={async (values, { setFieldError }) => {
                    return submitForm(values, setFieldError)
                }}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <Form>
                        <Title>
                            Recuperação de conta
                        </Title>
                        <Subtitle>
                            Digite o seu email cadastrado no caravan
                        </Subtitle>
                        <Label htmlFor="email">Email:</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Digite seu email cadastrado"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <ErrorMessage>
                                {errors.email && errors.email}
                            </ErrorMessage>
                        <Button onClick={handleSubmit}>
                            {loading ? (
                                <ClipLoader
                                    loading={loading}
                                    color="white"
                                    size="15"
                                />
                            ) : (
                                'Recuperar'
                            )}
                        </Button>
                        <Link
                            onClick={handleNavigateLogin}
                            style={{
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}
                        >
                            Voltar para o login
                    </Link>
                    </Form>
                )}
            </Formik>

        </Container>
    )
}
export default withRouter(ForgotPassword)
