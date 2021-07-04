import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'


//Pages 
import Home from './src/pages/Home/index'
import Cart from './src/pages/Home/Header/Cart/index'
import DashboardRoutes from './dashboard-routes'
import DetailsTrip from './src/pages/DetailsTrip/index'
import ForgotPassword from './src/pages/ForgotPassword/index'
import ListTrips from './src/pages/ListTrips/index'
import SignIn from './src/pages/SignIn/index'
import SignUp from './src/pages/SignUp/index'
import CheckoutStripe from './src/pages/Home/Header/Cart/CheckoutStripe/index'//Hooks
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()



export const Routes = ()=>{
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={StackNavigation} 
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ()=> <Icon name="home" size={30} color="black"/>
                }}
            />
            <Tab.Screen 
                name="Cart"
                component={Cart}
                options={{
                    tabBarLabel: 'Meu carrinho',
                    tabBarIcon: ()=> <Icon name="shopping-cart" size={30} color="black"/>
                }}

            />
        </Tab.Navigator>
    )
}

export const StackNavigation = ()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{
                    headerTitle: ''
                }}
            />
            <Stack.Screen 
                name="Dashboard" 
                component={DashboardRoutes} 
            />
            <Stack.Screen 
                name="DetailsTrip" 
                component={DetailsTrip} 
                options={{
                    headerTitle:"Detalhes do passeio"
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerTitle: 'Esqueceu a senha?'
                }}
            />      
            <Stack.Screen
                name="ListTrips"
                component={ListTrips}
                options={{
                    headerTitle: 'Passeios'
                }}
            />      
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerTitle: 'Acessar conta'
                }}
            />   
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerTitle: 'Criar conta'
                }}
            />
            <Stack.Screen
                name="CheckoutStripe"
                component={CheckoutStripe}
                options={{
                    headerTitle:"Pagamento"
                }}
            />
        </Stack.Navigator>
    )
}


