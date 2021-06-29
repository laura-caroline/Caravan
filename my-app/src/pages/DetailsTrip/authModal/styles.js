import styled, { keyframes } from 'styled-components/native'

export const Container = styled.View`  
  width: 400px;
  height: 300px;
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 4px 4px #ddd;
`
export const BoxNav = styled.View`
    width: 100%;
`
export const Title = styled.Text`
  width: 100%;
  text-align: center;
  color: gray;
`
export const ButtonClose = styled.Text`
    color: black;
    font-size: 18px;
    font-family: Arial;
    padding: 2px;
    border-radius: 50%;
`
export const BoxForm = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`
export const Label = styled.Text`
    width:100%
    color: #6e6e6e;
`
export const Input = styled.TextInput`
    width:100%;
    padding:10px;
    border: 2px solid #ddd;
    border-radius: 5px;
    marginVertical: 5px;
`
export const BoxGroupButtons = styled.View`
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    align-items: center;
`
export const ButtonSubmit = styled.Button`
    width: 40%;
    padding:10px;
    text-align: center;
    color:#ddd;
    background: #4300D2;
    border: none;
    margin-top: 10px;
`
export const Link = styled.Text`
`

export const ErrorMessage = styled.Text`
    color: red;
`