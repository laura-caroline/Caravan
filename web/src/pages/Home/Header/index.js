import React from 'react';

import {withRouter} from "react-router-dom";
import {MdShoppingCart} from 'react-icons/md'
import logo from '../../../assets/caravan.svg'
import Search from './Search/index'
import CheckOut from './Cart/index'
import {useCheckOut} from '../../../context/checkout'
import {useAuthenticate } from '../../../context/authenticate'
import {
    Header,
    ImageLogomarca,
    ButtonLogin,
    Link,
    WrapperHeaderLeft,
    WrapperSearch,
    WrapperHeaderRight, 
    GroupButtons,
    NumbersAttractionsBag,
    Action,
} from './styles'

const NavBar = ({ history }) => {
    const {handleShowCheckOut, showCheckOut, storagedTrips} = useCheckOut()
    const {authenticate, isAdmin, profile:{idUser, User, hierarchy}} = useAuthenticate()

    const handleClick = () => {
        if (authenticate) {
            if(isAdmin){
                return history.push(`/user/${User}/passeios`)
            }
            return history.push(`/user/${User}/meus-passeios`)
        }

        return history.push('/entrar')
    }
    return (
        <Header>
            <WrapperHeaderLeft>
                <Link href="/"><ImageLogomarca src={logo} /></Link>
                <WrapperSearch>
                    <Search />
                </WrapperSearch>
            </WrapperHeaderLeft>
            <WrapperHeaderRight>
                <GroupButtons>
                    <Action onClick={()=>handleShowCheckOut(showCheckOut? false: true)}>
                        <MdShoppingCart size="40"/>
                    </Action>
                    <NumbersAttractionsBag>{authenticate && storagedTrips.length}</NumbersAttractionsBag>
                    <ButtonLogin onClick={handleClick}>
                        {authenticate ? 'Meu painel' : 'Entrar'}
                    </ButtonLogin>
                </GroupButtons>
               <CheckOut/>
        </WrapperHeaderRight>
        </Header>
)}
export default withRouter(NavBar)