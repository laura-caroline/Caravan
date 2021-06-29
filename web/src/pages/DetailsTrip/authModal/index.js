import React from 'react'
import api from '../../../config/api'
import { useAuthenticate } from '../../../context/authenticate'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
    Container,
    BoxNav,
    Title,
    ButtonClose,
    BoxForm,
    Form,
    Label,
    Input,
    ButtonSubmit,
    BoxNavigation,
    Link,
    ErrorMessage
} from './styles'

export const AuthModal = ({ handleCloseModal }) => {
    const { handleModalLogin } = useAuthenticate()

    const FormSchema = Yup.object().shape({
        user: Yup
            .string()
            .required('Campo obrigatório')
        ,
        password: Yup
            .string()
            .required('Campo obrigatório')
    })

    const submitForm = async (values, setFieldError) => {
        const response = await api.post('/user/auth', values)
        const data = response.data

        if (response.status === 200) {
            handleModalLogin(data.token, {
                idUser: data.idUser,
                User: data.User,
                hierarchy: data.hierarchy
            })
            return handleCloseModal()
        }
        return setFieldError('password', data.error)
    }

    return (
        <Container>
            <BoxNav>
                <Title>Faça login</Title>
                <ButtonClose onClick={() => handleCloseModal()}>
                    X
                </ButtonClose>
            </BoxNav>
            <Formik
                initialValues={{
                    user: '',
                    password: ''
                }}
                validationSchema={FormSchema}
                onSubmit={async (values, { setFieldError }) => {
                    return submitForm(values, setFieldError)
                }}
            >
                {({ values, errors, handleChange, handleSubmit }) => (
                    <BoxForm>
                        <Form>
                            <Label htmlFor="user">Usuário</Label>
                            <Input
                                id="user"
                                name="user"
                                type="text"
                                onChange={handleChange}
                            />
                            <ErrorMessage>
                                {errors.user && errors.user}
                            </ErrorMessage>
                            <Label>Senha</Label>
                            <Input
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                            <ErrorMessage>
                                {errors.password && errors.password}
                            </ErrorMessage>

                            <BoxNavigation>
                                <ButtonSubmit onClick={handleSubmit}>
                                    Entrar
                                </ButtonSubmit>
                                <Link href="/recuperar-senha">
                                    Esqueceu a senha
                                </Link>
                                <Link href="/criar-conta">
                                    Criar conta
                            </Link>
                            </BoxNavigation>
                        </Form>
                    </BoxForm>
                )}
            </Formik>
        </Container>
    )
}
