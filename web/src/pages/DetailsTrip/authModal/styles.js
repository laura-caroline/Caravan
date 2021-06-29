import styled, { keyframes } from 'styled-components'

export const fadeIn = keyframes`
    0%{
            
        transform: translateY(-60px);
    }
    100%{
        
        transform: translateY(0px);
    }
`
export const Container = styled.div`  
  width: 400px;
  height: 300px;
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 4px 4px #ddd;
  animation: ${fadeIn} alternate 0.8s forwards;
`
export const BoxNav = styled.div`
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
`
export const Title = styled.div`
  width: 100%;
  text-align: center;
  color: gray;
`
export const ButtonClose = styled.span`
    color: black;
    cursor: pointer;
    font-size: 18px;
    font-family: Arial;
    padding: 2px;
    border-radius: 50%;
`
export const BoxForm = styled.div`
    max-width: 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const Form = styled.form`
    width: 80%;
    height: 250px;
    display:flex;
    flex-direction: column;
    justify-content: center
`
export const Label = styled.label`
    width:100%
    color: #6e6e6e;
`
export const Input = styled.input`
    width:100%;
    padding:10px;
    border: 2px solid #ddd;
    border-radius: 5px;
    margin: 5px 0px 5px 0px;
`
export const BoxNavigation = styled.div`
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
`
export const ButtonSubmit = styled.button`
    width: 40%;
    padding:10px;
    text-align: center;
    color:#ddd;
    
    background: #4300D2;
    border: none;
    margin-top: 10px;
`
export const Link = styled.a`
`

export const ErrorMessage= styled.span`
    width: 100%;
    color: red;
`