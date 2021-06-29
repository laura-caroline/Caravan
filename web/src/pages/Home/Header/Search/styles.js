import styled from 'styled-components'

export const WrapperForm = styled.div `
    min-width: 100%;
    display: flex;
    flex-direction: column;

`
export const Form = styled.form `
    width: 100%;
    display: flex;
    

`
export const Input = styled.input `
    width: 100%;
    padding: 10px;
    
`

export const WrapperList = styled.div `
    width: 100%;
    min-height: 220px;
    display: none;
    position: absolute;
    

    ${props => props.show === true && `
        display: block;
    `}

    @media(max-width: 750px){
        width: 80%;
        top: 90px;
    }
    

`

export const Error = styled.p `
    color: red;
    position: absolute;
    top: 85px;
`
export const LinkList = styled.a`
    width: 100%; 
    display: block;
    padding: 10px;
    color: white;
    font-weight: bolder;
    background: #585555;
    box-shadow: 2px 2px gray;
    
    
    

`