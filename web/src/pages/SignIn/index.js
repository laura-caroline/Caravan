import React, {useState, setState} from 'react'
import {withRouter} from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import api from '../../config/api'
import {useAuthenticate} from '../../context/authenticate'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {
    Container,
    Form,
    Label,
    Input,
    BoxNavigation,
    Button,
    Link,
    ErrorMessage,
} from '../../components/styles-form'


const SignIn = () => {
    const [loading, setLoading] = useState(false)
    const {handleLogin} = useAuthenticate()

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
            return handleLogin(data.token,{
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
                    user: '',
                    password: ''
                }}
                validationSchema={FormSchema}
                
                onSubmit={async (values, {setFieldError})=>{
                    submitForm(values, setFieldError)
                }}
            >
            {({errors, handleChange, handleSubmit})=>(
                <Form>
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
                    <Label htmlFor="password">Senha: </Label>
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
                    <BoxNavigation>
                        <Button onClick={handleSubmit}>
                            {loading? <ClipLoader size="15" color="white"loading={loading}/>: 'Entrar'}
                        </Button>
                        <Link href="/recuperar-senha">
                            Esqueceu a senha?
                        </Link>
                        <Link href ="criar-conta">
                            Criar conta
                        </Link>
                    </BoxNavigation>
                </Form>
            )}
            </Formik>
        </Container>
    )
}
export default withRouter(SignIn)