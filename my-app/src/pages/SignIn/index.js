import React, {useEffect, useState} from 'react'
import api from '../../config/api'
import {useNavigation} from '@react-navigation/native'
import {useAuthenticate} from '../../context/authenticate'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Spinner from 'react-native-loading-spinner-overlay'
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
    const [formData, setFormData] = useState({})
    const {handleLogin} = useAuthenticate()
    const navigation = useNavigation()

    useEffect(()=>{
        const unsubscribe = navigation.addListener('blur', ()=>{
            return setFormData({})
        })
    },[navigation])

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

    const handleNavigateForgotPassword = ()=>{
        return navigation.navigate('ForgotPassword')
    }
    const handleNavigateSignUp = ()=>{
        return navigation.navigate('SignUp')
    }

    const submitForm = async (values, setFieldError)=>{
        setLoading(true)
        try{
            const response = await api.post('/user/auth', values)
            const data = response.data
            
    
            if(response.status === 200){
                await handleLogin(data.token, {
                    idUser: data.idUser,
                    User: data.User,
                    hierarchy: data.hierarchy
                })
                if(data.hierarchy == 'admin'){
                    setLoading(false)
                    return navigation.navigate('Dashboard', {screen: 'Passeios'})
                }
                setLoading(false)
                return navigation.navigate('Dashboard', {screen: 'Meus passeios'})
            }
        }
        catch(error){
            setLoading(false)
            return setFieldError('password', error.response.data.error)
        }    
    }
    return(
        <Container>
            <BoxContent>
                <Content>
                    <Spinner
                        loading={loading}
                        textContent="Loading..."
                        textStyle={{color: '#FFF'}}

                    />
                    <Title>Acesse sua conta</Title>
                    <Formik
                        initialValues={formData}
                        enableReinitialize={true}
                        validationSchema={FormSchema}
                        onSubmit={async (values, {setFieldError}) =>{
                            return await submitForm(values, setFieldError)
                        }}
                    >
                    {({handleChange,handleSubmit,errors}) =>(
                        
                    <>
                        <Label>Usuário</Label>
                            <Input
                                value={formData.user}
                                placeholder="Digite seu usuário"
                                autoCapitalize="none"
                                onChangeText={(user)=> setFormData({...formData, user: user})}

                            />
                            <MessageError>
                                {errors.user && errors.user}
                            </MessageError>
                        <Label>Senha</Label>
                            <Input
                                value={formData.password}
                                placeholder="Digite sua senha"
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(password)=> setFormData({...formData, password: password})}
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