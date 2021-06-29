import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Form = styled.form`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px;
    border: 1px solid #ddd;

    @media(max-width: 800px){
        width: 100%;
    }
`
export const Title = styled.h2`
    font-size: 25px;
`
export const Subtitle = styled.h4`
    font-size: 15px;
`

export const Label = styled.label`
    width: 100%;
    margin: 15px 0px 15px 0px;
`
export const Input = styled.input`
    width: 100%; 
    box-sizing: border-box; 
    border: 3px solid #ddd;
    border-radius: 10px;  
    padding: 20px;
    
`
export const ErrorMessage = styled.p`
    width: 100%;
    color: red;
`
export const BoxNavigation = styled.div`
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
`
export const Button = styled.button`
    width: 50%;
    display:flex;
    justify-content: center;    
    cursor: pointer;
    margin: 20px 0px 20px 0px;
    padding: 10px;
    background: #4300D2;
    color: white;
    font-weight: bold;
    
    @media(max-width: 800px){
        width: 30%;
    }
`

export const Link = styled.a `
    color: black;
    text-decoration: none;
`