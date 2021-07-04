import React, {useState, useEffect} from 'react'
import {StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import api from '../../config/api'
import {useAuthenticate} from '../../context/authenticate'
import {TextInputMask} from 'react-native-masked-text'
import {Formik} from 'formik'
import * as Yup from 'yup'
import Spinner from 'react-native-loading-spinner-overlay'

import {
    Container,
    BoxContent,
    Content,
    Title,
    Label,
    Input,
    Button,
    MessageError
} from '../../components/styles-form'
const SignUp = ()=>{
    
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const {handleLogin} = useAuthenticate()
    const navigation = useNavigation()

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

    useEffect(()=>{
        const unsubscribe = navigation.addListener('blur', ()=>{
            return setFormData({})
        })
    },[navigation])

    const handleChange = (field, value)=>{
        return setFormData({...formData, [field]: value})
    }
    
    const submitForm = async (values, setFieldError)=>{
        setLoading(true)
        const response = await api.post('/user', values)
        const data = response.data
        
        if(response.status === 200){
            await handleLogin(data.token,{
                idUser: data.idUser,
                User: data.User,
                hierarchy: data.hierarchy
            })
            if(data.hierarchy === 'admin'){
                setLoading(false)
                return navigation.navigate('Dashboard', {screen: 'Passeios'})
            }
            setLoading(false)
            return navigation.navigate('Dashboard', {screen: 'Meus passeios'})
        }
        setLoading(false)
        return setFieldError('password', data.error)
    }
    return(
        <Container>
            <BoxContent>
                <Content>
                    <Spinner 
                        visible={loading}
                        textContent="Loading..."
                        textStyle={{color: '#FFF'}}  
                    />
                    <Title>Crie sua conta</Title>
                    <Formik
                        initialValues={formData}
                        enableReinitialize
                        validationSchema={FormSchema}
                        onSubmit={async (values, {setFieldError}) =>{
                            return await submitForm(values, setFieldError)
                        }}
                    >
                    {({handleSubmit, errors}) => (
                        <>
                        <Label>Nome</Label>
                            <Input 
                                placeholder="Digite seu nome"
                                onChangeText={(name)=> handleChange('name', name)}
                            />
                            <MessageError>
                                {errors.name && errors.name}
                            </MessageError>
                        <Label>Telefone</Label>
                            <TextInputMask
                                style={styles.input}
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99)'
                                }}
                                placeholder="(99) 99999-9999"
                                value={formData.phone}
                                onChangeText={(phone)=> handleChange('phone', phone)}
                            />
                            <MessageError>
                                {errors.phone && errors.phone}
                            </MessageError>
                        <Label>CPF</Label>  
                            <TextInputMask
                                style={styles.input}
                                type={'cpf'}
                                placeholder="999.999.999-99"
                                value={formData.cpf}
                                onChangeText={(cpf)=> handleChange('cpf', cpf)}
                            />
                            <MessageError>
                                {errors.cpf && errors.cpf}
                            </MessageError>
                        <Label>Usuário</Label>
                            <Input 
                                autoCapitalize="none"
                                placeholder="Digite seu usuário"
                                onChangeText={(user)=> handleChange('user', user)}
                            />
                            <MessageError>
                                {errors.user && errors.user}
                            </MessageError>
                        <Label>Email</Label>
                            <Input
                                placeholder="Digite seu email"
                                autoCapitalize="none"
                                onChangeText={(email)=> handleChange('email', email)}
                            />
                            <MessageError>
                                {errors.email && errors.email}
                            </MessageError>
                        <Label>Senha</Label>
                            <Input
                                placeholder="Digite sua senha"
                                autoCapitalize="none"
                                secureTextEntry
                                onChangeText={(password)=> handleChange('password', password)}
                            />
                            <MessageError>
                                {errors.password && errors.password}
                            </MessageError>
                        <Button
                            title={'Criar conta'}
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
const styles = StyleSheet.create({
    input:{
        borderRadius: 5,
        padding: 15,
        borderStyle: "solid",
        borderColor: "#ddd",
        borderWidth: 1,
    }
})

export default SignUp