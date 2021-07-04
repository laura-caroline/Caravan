import styled, { keyframes } from 'styled-components'


export const Container = styled.div`
    width: 100%;
    height: 70px;
    background: #017AFD;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    
`
export const BoxNavigation = styled.nav`
    width: 100%;
    display: flex;
    align-items: center;    
    justify-content: space-between;
`
export const Logo = styled.a`
    width: 10%;    
    font-size: 30px;
    color: black;
    text-decoration: none;
`
export const Ul = styled.ul`
    height: 200px;
    position: absolute;
    border: 1px solid black;
    background: #017AFD;
    box-shadow: 8px 8px gray;

`
export const Li = styled.li`
    width: 100%;
    
`
export const Link = styled.a`
   display: block;
   text-decoration: none;
   color: black;
   cursor: pointer;
   font-size: 20px;
   margin-top: 10px;
   padding: 10px;
`


export const AnimationScale = keyframes`
    from{
        transform: scale(0);
    }
    to{
        transform: scale(1);
    }
`

export const BoxGroupButtons = styled.div`
    min-width: 15%;
    z-index:4;
    position: absolute;
    min-height: 100%;
    background: #ddd;
    transform: scale(0);
    top: 70px;
    animation: ${AnimationScale} ${props => props.show ? '0.4s alternate forwards' : 'none'};

`

export const ListButtons = styled.ul `
    list-style: none;
    background: #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Item = styled.li`
    
`