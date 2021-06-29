import React, { useState } from 'react'
import InputMask from 'react-input-mask'
import ClipLoader from 'react-spinners/ClipLoader'
import { withRouter } from 'react-router-dom'
import api from '../../config/api'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useAuthenticate } from '../../context/authenticate'
import {
    Container,
    Form,
    Label,
    Link,
    Input,
    Button,
    Title,
    ErrorMessage
} from '../../components/styles-form'

const SignUp = ({ history }) => {
    const [loading, setLoading] = useState('')
    const { 
        handleLogin
    } = useAuthenticate()

    const FormSchema = Yup.object().shape({
        name: Yup
            .string().
            required('Campo obrigatório')
        ,
        phone: Yup
            .string()
            .matches(/^\((\d+)\)\9(\d){4}\-(\d){4}/, 'Formato valido: (99)99999-9999')
            .required('Campo obrigatório')
        ,
        cpf: Yup
            .string()
            .matches(/^(\d){3}\.(\d){3}\.(\d){3}\-(\d){2}$/, "Formato valido: 999.999.999-99")
            .required('Campo obrigatório')
        ,
        user: Yup
            .string()
            .required('Campo obrigatório')
        ,
        email: Yup
            .string()
            .matches(/^(\w+)\@(\w+)(\W+\w+)+/, "Email invalido")
            .required('Campo obrigatório')
        ,
        password: Yup
            .string()
            .required('Campo obrigatório')
    })

    const handleBackPageLogin = () => {
        return history.push('entrar')
    }

    const submitForm = async (values, setFieldError) => {
        setLoading(true)
        const response = await api.post('/user', values)
        const data = response.data
        setLoading(false)

        if(response.status === 200){
            return handleLogin(data.token, {
                idUser: data.idUser,
                User: data.User,
                hierarchy: data.hierarchy
            })
        }
        return setFieldError('password', data.error)
    }


    return (
        <Container>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    cpf: '',
                    user: '',
                    email: '',
                    password: '',
                }}
                validationSchema={FormSchema}
                onSubmit={async (values, { setFieldError }) => {
                    return submitForm(values, setFieldError)
                }}
            >
                {({ errors, handleChange, handleSubmit }) => (
                    <Form>
                        <Title>Criar conta</Title>
                        <Label htmlFor="name">Nome:</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Digite seu nome"
                                onChange={handleChange}

                            />
                            <ErrorMessage>
                                {errors.name && errors.name}
                            </ErrorMessage>
                        <Label htmlFor="phone">Telefone:</Label>
                            <InputMask
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    border: '3px solid #ddd',
                                    borderRadius: '10px',
                                    boxSizing: 'border-box',
                                }}
                                name="phone"
                                placeholder="(99) 99999-9999"
                                mask="(99)99999-9999"
                                onChange={handleChange}
                            />
                            <ErrorMessage>
                                {errors.phone && errors.phone}
                            </ErrorMessage>
                        <Label>CPF</Label>
                            <InputMask
                                style={{
                                    width: '100%',
                                    padding: '20px',
                                    border: '3px solid #ddd',
                                    borderRadius: '10px',
                                    boxSizing: 'border-box',
                                }}
                                name="cpf"
                                placeholder="999.999.999-99"
                                mask="999.999.999-99"
                                onChange={handleChange}
                            />
                            <ErrorMessage>
                                {errors.cpf && errors.cpf}
                            </ErrorMessage>
                        <Label htmlFor="user">Usuário:</Label>
                            <Input
                                id="user"
                                name="user"
                                placeholder="Digite seu usuário"
                                onChange={handleChange}
                            />
                            <ErrorMessage>
                                {errors.user && errors.user}
                            </ErrorMessage>

                        <Label>Email:</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Digite seu email"
                                onChange={handleChange}
                            />
                            <ErrorMessage>
                                {errors.email && errors.email}
                            </ErrorMessage>

                        <Label>Senha:</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Digite sua senha"
                                onChange={handleChange}
                            />
                            <ErrorMessage>
                                {errors.password && errors.password}
                            </ErrorMessage>

                        <Button onClick={handleSubmit}>
                            Criar sua conta
                            <ClipLoader
                                size="15"
                                color="white"
                                loading={loading}
                            />
                        </Button>
                        <Link
                            style={{
                                cursor: 'pointer',
                                marginTop: '20px'
                            }}
                            onClick={handleBackPageLogin}
                        >
                            Voltar para o login
                        </Link>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}
export default withRouter(SignUp)

