import React, {useState} from 'react'
import api from '../../../config/api'
import {useAuthenticate} from '../../../context/authenticate'
import {useNavigation} from '@react-navigation/native'
import Formik, { ErrorMessage } from 'formik'
import {
    Container,
    BoxNav,
    Title,
    ButtonClose,
    BoxForm,
    Label,
    Input,
    ButtonSubmit,
    BoxGroupButtons,
    Link
} from './styles'

export const AuthModal = ({handleCloseModal})=>{
    const [formData, setFormData] = useState({})
    const navigation = useNavigation()

    const {
        handleModalLogin
    } = useAuthenticate()

    const FormSchema = Yup.object().shape({
        user: Yup
            .string()
            .required('Campo obrigatório')
        ,
        password: Yup
            .string()
            .required('Campo obrigatório')
    })

   const handleNavigateForgotPassword = ()=>{
        return navigation.navigate('ForgotPassword')
   }
   const handleNavigateSignUp = ()=>{
        return navigation.navigate('SignUp')
   }
    const submitForm = async (values, setFieldError)=>{
        const response = await api.post('/user/auth', values)
        const data = response.data

        if(response.status === 200){
            handleModalLogin(data.token, {
                idUser: data.idUser,
                User: data.User,
                hierarchy: data.hierarchy
            })
            return handleCloseModal()   
        }
        return setFieldError('password', data.error)
    }
    return( 
        <Container>
            <BoxNav>
                <Title>Faça login</Title>
                <ButtonClose 
                    onPress={()=> handleCloseModal()}
                >
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
            {({ errors, handleChange, handleSubmit }) => (
                <BoxForm>
                    <Label>Usuário</Label>
                        <Input
                            autoCapitalize="none"
                            onChangeText={handleChange('user')}
                        />
                        <ErrorMessage>
                            {errors.user && errors.user}
                        </ErrorMessage>
                    <Label>Senha</Label>
                        <Input
                            autoCapitalize="none" 
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            
                        />
                        <ErrorMessage>
                            {errors.password && errors.password}
                        </ErrorMessage>
                    <BoxGroupButtons>
                        <ButtonSubmit
                            title="Entrar"
                            onPress={handleSubmit}
                        />
                        <Link onPress={handleNavigateForgotPassword}>Esqueceu a senha</Link>
                        <Link onPress={handleNavigateSignUp}>Criar conta</Link>
                    </BoxGroupButtons>
                    
                </BoxForm>  
            )}
            </Formik>
            
        </Container>
    )
}
