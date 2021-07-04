import React, { useEffect } from 'react'
import { useAuthenticate } from './src/context/authenticate'
import {useNavigation} from '@react-navigation/native'
import MyTripsBuyed from './src/pages/Dashboard/Default/MyTripsBuyed/index'
import MyCart from './src/pages/Dashboard/Default/MyCart/index'
import TripsSelled from './src/pages/Dashboard/Admin/TripsSelled/index'
import ListTrips from './src/pages/Dashboard/Admin/ListTrips/index'
import CreateTrip from './src/pages/Dashboard/Admin/CreateTrip/index'
import UpdateTrip from './src/pages/Dashboard/Admin/UpdateTrip/index'

import SignIn from './src/pages/SignIn/index'
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native'

const Drawer = createDrawerNavigator()

const DashboardRoutes = () => {
    const {handleLogout, authenticate, isAdmin} = useAuthenticate()
   
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerComp {...props} />}>
                {isAdmin ? (
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
                )}
                
        </Drawer.Navigator>
    )
}

const CustomDrawerComp = (props) => {
    const navigation = useNavigation()
    const {handleLogout, authenticate,setAuthenticate, isAdmin} = useAuthenticate()
    
    const handleSignOut = async (props)=>{
        await handleLogout()
        navigation.navigate('SignIn')
    }
    return (
        <DrawerContentScrollView {...props}>
                {isAdmin ? (
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
                        <DrawerItem label="Sair" onPress={handleSignOut}/>
                        
                       
                    </>
                )}
            
        </DrawerContentScrollView>
    );
};


export default DashboardRoutes