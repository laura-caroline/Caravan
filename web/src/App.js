import React from 'react'
import Routes from './routes'
import AuthenticateProvider from './context/authenticate'
import { BrowserRouter } from 'react-router-dom'
import { CheckOutProvider } from './context/checkout'
import './styles.css'
const App = () => {
    return (
        <BrowserRouter>
            <AuthenticateProvider>
                <CheckOutProvider>
                    <Routes />
                </CheckOutProvider>
            </AuthenticateProvider>
        </BrowserRouter>

    )
}
export default App