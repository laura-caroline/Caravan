import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
// Componentes
import Main from './pages/Home/index'
import SignIn from './pages/SignIn/index'
import SignUp from './pages/SignUp/index'
import ForgotPassword from './pages/ForgotPassword/index'
import UpdatePassword from './pages/UpdatePassword/index'
import MyTripsBuyed from './pages/Dashboard/Default/MyTripsBuyed/index'
import SettingTrips from './pages/Dashboard/Admin/index'
import UpdateTrip from './pages/Dashboard/Admin/UpdateTrip/index'
import ListTrip from './pages/ListTrip/index'
import DetailsTrip from './pages/DetailsTrip/index'
import TripsSelled from './pages/Dashboard/Admin/TripsSelled/index'
import PageNavigateSite from './pages/UpdatePassword/PageNavigateSite/index'
// Context
import {useAuthenticate} from './context/authenticate'
import Checkout from './pages/Home/Header/Cart/CheckoutStripe/checkout'

const Routes = () => {
    const {authenticate, isAdmin} = useAuthenticate(
        
    )
    const PrivateRouter = ({privated, admin, ...rest})=>{
        if(privated && !authenticate){
            return <Redirect to="/entrar"/>
        }
        return <Route {...rest}/>
    }

    return (
        <Switch>
            <Route exact path='/' component={Main}/>
            <Route exact path="/entrar" component={SignIn}/>
            <Route exact path="/criar-conta" component={SignUp}/>
            <Route exact path ="/recuperar-senha" component={ForgotPassword}/>
            <Route exact path="/recuperar-senha/:token/:id" component={UpdatePassword}/>  
            <Route exact path="/trip/" component={ListTrip}/>  
            <Route exact path='/trip/:id' component={DetailsTrip}/>
            <Route exact path="/updated" component={PageNavigateSite}/>
            <Route exact path="/payment" component={Checkout} />
            {authenticate && (
                <>  
                    <PrivateRouter privated exact path="/user/:user/meus-passeios" component={MyTripsBuyed}/>       
                    <PrivateRouter privated exact path="/user/:user/passeios" component={SettingTrips}/>
                    <PrivateRouter privated exact path="/user/:user/editar/:id" component={UpdateTrip}/>
                    <PrivateRouter privated exact path="/user/:user/passeios-vendidos/" component={TripsSelled}/>
                </>
            )}
            

            

            
            
            
        </Switch>
        
    )
}
export default Routes
