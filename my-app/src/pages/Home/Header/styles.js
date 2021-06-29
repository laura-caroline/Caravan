import styled, { keyframes } from 'styled-components/native'

export const Header = styled.View`
    width: 100%;
    height: 100px;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 9999;
    overflow: scroll;

`
export const Image = styled.Image`
    width: 100px;
`
export const ButtonLogin = styled.Button`
    width: 30%;
    color: white;
    font-weight: bold;
    margin-left: 20px;
    text-align: center;
    border: 1px solid gray;
    padding: 10px;
    background: #4300D2;


`
export const Link = styled.Text`
    width: 150px;
`   
export const BoxHeaderLeft = styled.View`
    width: 70%;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
`
export const BoxSearch = styled.View`
    width: 100%;

`
export const BoxHeaderRight = styled.View`
    width: 30%;
    position: relative; 
`
export const BoxGroupButtons = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
`
export const NumbersAttractionsBag = styled.Text`
    width: 20px;
    text-align: center;
    color: white;
    font-weight: bold;
    background: red;
    border-radius: 50;   
`
export const Action = styled.Text`
    
`