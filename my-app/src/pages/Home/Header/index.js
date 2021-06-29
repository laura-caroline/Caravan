import React from 'react';
import Search from './Search/index'
import {useNavigation} from '@react-navigation/native'
import {Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {useCheckOut} from '../../../context/checkout'
import {useAuthenticate } from '../../../context/authenticate'
import {
    Header,
    Image,
    ButtonLogin,
    Link,
    BoxHeaderLeft,
    BoxSearch,
    BoxHeaderRight, 
    BoxGroupButtons,
    NumbersAttractionsBag,
    Action,
} from './styles'

const NavBar = () => {
    const {authenticate, isAdmin} = useAuthenticate()
    const navigation = useNavigation()
    
    const handleClickEnter = () => {
        if (authenticate) {
            if(isAdmin){
                return navigation.navigate('Dashboard', {screen: 'Passeios'})
            }
            return navigation.navigate('Dashboard', {screen: 'Meus passeios'})
        }

        return navigation.navigate('SignIn')
    }
    const handleClickCart = ()=>{
        return navigation.navigate('Cart')
    }

    return (
        <Header>
            <BoxHeaderLeft>
                <Text 
                    style={{
                        fontSize: 25, 
                        width: '100%'
                    }}
                >
                    CARAVAN
                </Text>
                <BoxSearch>
                    <Search/>
                </BoxSearch>
            </BoxHeaderLeft>
            <BoxHeaderRight>
                <BoxGroupButtons>
                    <Icon 
                        name="shopping-cart"
                        size={30}
                        color="black"
                        onPress={handleClickCart}
                    />
                    <ButtonLogin 
                        title={authenticate ? 'Meu painel' : 'Entrar'}
                        onPress={handleClickEnter}
                    />
                   
                </BoxGroupButtons>
        </BoxHeaderRight>
        </Header>
)}
export default NavBar