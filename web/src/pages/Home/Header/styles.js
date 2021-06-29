import styled, { keyframes } from 'styled-components'

export const Header = styled.header`
    width: 100%;
    height: 100px;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background: white;

`
export const ImageLogomarca = styled.img`
    width: 100px;
`
export const Nav = styled.nav `
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    @media(max-width: 750px){
        width: 100%;
    }
`
export const ButtonLogin = styled.a `
    width: 30%;
    cursor: pointer;
    color: white;
    font-weight: bolder;
    margin-left: 20px;
    text-align: center;
    border: 1px solid gray;
    padding: 10px;
    background: #4300D2;


`
export const Link = styled.a`
    width: 150px;
`


export const WrapperHeaderLeft = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
`
export const WrapperSearch = styled.div`
    width: 100%;
`
export const WrapperHeaderRight = styled.div`
    width: 30%;
    position: relative; 
`
export const GroupButtons = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`
export const NumbersAttractionsBag = styled.p`
    width: 20px;
    text-align: center;
    color: white;
    font-weight: bolder;
    background: red;
    border-radius: 50%;   
`
export const Action = styled.a`
    cursor: pointer;
`