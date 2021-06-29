import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Routes from './routes'
import AuthenticateProvider from './src/context/authenticate'
import {CheckOutProvider} from './src/context/checkout'
export default function App() {
  return (
    <AuthenticateProvider>
          <CheckOutProvider>
           <NavigationContainer>
                <Routes/>
            </NavigationContainer>
          </CheckOutProvider>
    </AuthenticateProvider>
    
   
  );
}
