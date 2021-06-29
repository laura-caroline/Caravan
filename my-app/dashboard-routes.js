import React from 'react'
import { useAuthenticate } from './src/context/authenticate'

import MyTripsBuyed from './src/pages/Dashboard/Default/MyTripsBuyed/index'
import MyCart from './src/pages/Dashboard/Default/MyCart/index'
import TripsSelled from './src/pages/Dashboard/Admin/TripsSelled/index'
import ListTrips from './src/pages/Dashboard/Admin/ListTrips/index'
import CreateTrip from './src/pages/Dashboard/Admin/CreateTrip/index'
import UpdateTrip from './src/pages/Dashboard/Admin/UpdateTrip/index'


import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator()

const DashboardRoutes = () => {
    const {handleLogout, authenticate, isAdmin} = useAuthenticate()

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerComp {...props} />}>
            {authenticate && (
                (isAdmin ? (
                    <>
                        <Drawer.Screen name="Passeios" component={ListTrips} options={{ headerTitle: "Passeios" }} />
                        <Drawer.Screen name="Passeios vendidos" component={TripsSelled} />
                        <Drawer.Screen name="Criar passeio" component={CreateTrip} />
                        <Drawer.Screen name="UpdateTrip" component={UpdateTrip} />

                    </>
                ):(
                    <>
                        <Drawer.Screen name="Meus passeios" component={MyTripsBuyed} />
                        <Drawer.Screen name="Meu carrinho" component={MyCart} />
                    </>
                    ))
                )}
        </Drawer.Navigator>
    )
}

const CustomDrawerComp = (props) => {
    const { navigation } = props;
    const {handleLogout, authenticate, isAdmin} = useAuthenticate()

    const handleSignOut = ()=>{
        handleLogout()
        return navigation.navigate('Routes', {screen: 'SignIn'})
    }
    return (
        <DrawerContentScrollView {...props}>
            {authenticate && (
                (isAdmin ? (
                    <>
                        <DrawerItem label="Passeios" onPress={()=> navigation.navigate('Passeios')}/>
                        <DrawerItem label="Passeios vendidos" onPress={()=> navigation.navigate('Passeios vendidos')}/>
                        <DrawerItem label="Criar passeio" onPress={()=> navigation.navigate('Criar passeio')}/>
                        <DrawerItem label="Sair" onPress={()=> handleSignOut()}/>
                    </>
                ):(
                    <>
                        <DrawerItem label="Meus passeios" onPress={()=> navigation.navigate('Meus passeios')}/>
                        <DrawerItem label="Meu carrinho" onPress={()=> navigation.navigate('Meu carrinho')}/>
                        <DrawerItem label="Sair" onPress={()=> handleSignOut()}/>
                    </>
                ))
            )}
        </DrawerContentScrollView>
    );
};


export default DashboardRoutes