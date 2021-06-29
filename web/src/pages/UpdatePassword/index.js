import React, { useEffect, useState } from 'react'
import { useParams, withRouter } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import api from '../../config/api'
import { useAuthenticate } from '../../context/authenticate'
import { Formik } from 'formik'
import * as Yup from 'yup'

import {
    Container,
    Form,
    Title,
    Link,
    Input,
    Label,
    Button,
    ErrorMessage,
} from '../../components/styles-form'
const UpdatePassword = ({ history }) => {
    const [loading, setLoading] = useState(false)
    const [expired, setExpired] = useState(false)

    const { handleAuthenticateEmail } = useAuthenticate()
    const {
        id,
        token
    } = useParams()

    useEffect(() => {
        (async () => {
            const isExpired = await handleAuthenticateEmail(token)
            if (!isExpired) {
                return setExpired(true)
            }
        })()
    }, [])

    const FormSchema = Yup.object().shape({
        newPassword: Yup
            .string()
            .required('Campo obrigatório')
        ,
        confirmNewPassword: Yup
            .string()
            .oneOf([Yup.ref('newPassword'), null], "As senhas devem corresponder")
            .required('Campo obrigatório')
    })


    const handleNavigateLogin = () => {
        return history.push('/login')
    }

    const submitForm = async (values, setFieldError) => {
        const response = await api.put(`/user/${id}`, values.newPassword)
        const data = response.data

        if (response.status !== 200) {
            return setFieldError('confirmNewPassword', data.error)
        }
        return history.push('/updated')
    }

    return (
        <>
            {!expired ? (
                <Container>
                    <Formik
                        initialValues={{
                            newPassword: '',
                            confirmNewPassword: ''
                        }}
                        validationSchema={FormSchema}
                        onSubmit={async (values, { setFieldError }) => {
                            return submitForm(values, setFieldError)
                        }}
                    >
                        {({ errors, handleChange, handleSubmit }) => (
                            <Form>
                                <Title>Modifique sua senha</Title>
                                <Label>Nova senha</Label>
                                <Input
                                    name="newPassword"
                                    type="password"
                                    placeholder="Digite sua nova senha"
                                    onChange={handleChange}
                                />
                                <ErrorMessage>
                                    {errors.newPassword && errors.newPassword}
                                </ErrorMessage>
                                <Label>Confirme sua nova senha</Label>
                                <Input
                                    name="confirmNewPassword"
                                    type="password"
                                    placeholder="Digite novamente sua nova senha"
                                    onChange={handleChange}
                                />
                                <ErrorMessage>
                                    {errors.confirmNewPassword && errors.confirmNewPassword}
                                </ErrorMessage>
                                <Button onClick={handleSubmit}>
                                    Enviar <ClipLoader loading={loading} />
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
            ) : (
                    <h1>Token expirado</h1>
                )}
        </>
    )
}
export default withRouter(UpdatePassword)
