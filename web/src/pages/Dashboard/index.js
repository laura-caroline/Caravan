import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import {useAuthenticate} from '../../context/authenticate'
import Check from '../Home/Header/Cart/CheckoutStripe/index'
import {
    Container,
    BoxNavigation,
    Logo,
    Link,
    BoxGroupButtons,
    ListButtons,
    Item
} from './styles'

export const Dashboard = () => {
    const [visible, setVisible] = useState(false)
    //Contexts
    const {handleLogout, isAdmin, profile:{idUser, User}} = useAuthenticate()
    //
    const handleVisibleModal = () => {
        const isVisible = visible ? false : true
        return setVisible(isVisible)

    }
    const handleLogoutUser = ()=>{
        return handleLogout()
    }
    return (
        <Container>
            <BoxNavigation>
                <Logo href= {window.location.href}>DASHBOARD</Logo>
                <Logo>
                    <MdAccountCircle onClick={handleVisibleModal} size="50px"/>
                </Logo>   
            </BoxNavigation>
            <BoxGroupButtons show={visible}>
                    {!isAdmin ?(
                        <ListButtons>
                            <Item>
                                <Link href={`/user/${User}/meus-passeios`}>
                                    Minhas viagens
                                </Link>
                            </Item>
                            <Item>
                                <Link>
                                    <Check/>
                                </Link>
                            </Item> 
                            <Item onClick={handleLogoutUser}><Link>Sair</Link></Item>
                        </ListButtons>
                    ):(
                        <ListButtons>
                            <Item>
                                <Link href={`/user/${User}/passeios`}>
                                Passeios
                                </Link>
                            </Item>  
                            <Item>
                                <Link href={`/user/${User}/passeios-vendidos`}>
                                    Passeios vendidos
                                </Link>
                            </Item>
                            <Item onClick={handleLogoutUser}><Link>Sair</Link></Item>
                        </ListButtons> 
                    )}
                    
                
            </BoxGroupButtons>
        </Container>
    )
}