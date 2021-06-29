import React, {useState} from 'react'
import api from '../../config/api'
import {useNavigation} from '@react-navigation/native'
import {useAuthenticate} from '../../context/authenticate'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {
    Container,
    BoxContent,
    BoxNavigation,
    Content,
    Title,
    Label,
    Input,
    Link,
    Button,
    MessageError,
} from '../../components/styles-form'

const SignIn = ()=>{
    const [loading, setLoading] = useState(false)
    
    const {handleLogin} = useAuthenticate()
    const navigation = useNavigation()

    const handleNavigateForgotPassword = ()=>{
        return navigation.navigate('ForgotPassword')
    }
    const handleNavigateSignUp = ()=>{
        return navigation.navigate('SignUp')
    }

    const FormSchema = Yup.object().shape({
        user: Yup
            .string()
            .required('Campo obrigatório')
        ,
        password: Yup
            .string()
            .required('Campo obrigatório')
        ,
    })

    const submitForm = async (values, setFieldError)=>{
        setLoading(true)
        const response = await api.post('/user/auth', values)
        const data = response.data
        setLoading(false)

        if(response.status === 200){
            await handleLogin(data.token, {
                idUser: data.idUser,
                User: data.User,
                hierarchy: data.hierarchy
            })
            if(data.hierarchy == 'admin'){
                return navigation.navigate('Dashboard', {screen: 'Passeios'})
            }
            return navigation.navigate('Dashboard', {screen: 'Meus passeios'})
        }
        return setFieldError('password', data.error)
    }
    return(
        <Container>
            <BoxContent>
                <Content>
                <Title>Acesse sua conta</Title>
                <Formik
                    initialValues={{
                        user: '',
                        password: '',
                    }}
                    validationSchema={FormSchema}
                    onSubmit={async (values, {setFieldError}) =>{
                        return submitForm(values, setFieldError)
                    }}
                >
                {({
                    handleChange,
                    handleSubmit,
                    errors,
                }) =>(
                <>
                    <Label>Usuário</Label>
                        <Input
                            placeholder="Digite seu usuário"
                            autoCapitalize="none"
                            onChangeText={handleChange('user')}

                        />
                        <MessageError>
                            {errors.user && errors.user}
                        </MessageError>
                    <Label>Senha</Label>
                        <Input
                            placeholder="Digite sua senha"
                            autoCapitalize="none"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                        />
                        <MessageError>
                            {errors.password && errors.password}
                        </MessageError>
                    <Button 
                        title='Entrar'
                        onPress={handleSubmit}
                    />
                    <BoxNavigation>
                        <Link onPress={handleNavigateForgotPassword}> Esqueceu a senha? </Link>
                        <Link onPress={handleNavigateSignUp}>Crie sua conta</Link>
                    </BoxNavigation>
                </>
                )}
                </Formik>
                </Content>
            </BoxContent>
        </Container>
    )
}
export default SignIn