import React, {useState} from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import api from '../../config/api'
import {useAuthenticate} from '../../context/authenticate'
import {TextInputMask} from 'react-native-masked-text'
import {Formik} from 'formik'
import {View} from 'react-native'
import * as Yup from 'yup'
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

    const submitForm = async (values, setFieldError)=>{
        const response = await api.post('/user', values)
        const data = response.data

        if(response.status === 200){
            await handleLogin(data.token,{
                idUser: data.idUser,
                User: data.User,
                hierarchy: data.hierarchy
            })
            if(data.hierarchy === 'admin'){
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
                <Title>Crie sua conta</Title>
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
                    onSubmit={async (values, {setFieldError}) =>{
                        return submitForm(values, setFieldError)
                    }}
                >
                {({
                    values, 
                    handleChange, 
                    handleSubmit, 
                    errors
                }) => (
                    <>
                    <Label>Nome</Label>
                        <Input 
                            placeholder="Digite seu nome"
                            onChangeText={handleChange('name')}
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
                            value={values.phone}
                            onChangeText={handleChange('phone')}
                        />
                        <MessageError>
                            {errors.phone && errors.phone}
                        </MessageError>
                    <Label>CPF</Label>
                        <TextInputMask
                            style={styles.input}
                            type={'cpf'}
                            placeholder="999.999.999-99"
                            value={values.cpf}
                            onChangeText={handleChange('cpf')}
                        />
                        <MessageError>
                            {errors.cpf && errors.cpf}
                        </MessageError>
                    <Label>Usuário</Label>
                        <Input 
                            autoCapitalize="none"
                            placeholder="Digite seu usuário"
                            onChangeText={handleChange('user')}
                        />
                        <MessageError>
                            {errors.user && errors.user}
                        </MessageError>
                    <Label>Email</Label>
                        <Input
                            placeholder="Digite seu email"
                            autoCapitalize="none"
                            onChangeText={handleChange('email')}
                        />
                        <MessageError>
                            {errors.email && errors.email}
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
                        title={!loading ? 'Criar conta' 
                            : <ActivityIndicator animating={loading}/>}
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