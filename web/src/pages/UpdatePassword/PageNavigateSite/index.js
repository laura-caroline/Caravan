import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    Container,
    BoxNavigation,
    Status,
    Button,
} from './styles'

const PageNavigateSite = ({status, history})=>{
    const handleNavigateSite = ()=>{
        return history.push('/')
    }
    return(
        <Container>
            <BoxNavigation>
                <Status>{status}</Status>
                <Button onClick={handleNavigateSite}>Voltar para o site</Button>
            </BoxNavigation>
        </Container>
    )
}
export default withRouter(PageNavigateSite)