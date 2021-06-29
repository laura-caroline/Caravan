import styled, { keyframes } from 'styled-components/native'

export const BoxContent = styled.View`
    
`
export const Container = styled.ScrollView`
    width: 100%;
    border: 1px solid black;
    box-shadow: 2px 2px black;
`
export const Image = styled.Image `
    width: 40%;
`
export const BoxActionUp = styled.View`
    width: 100%;
    justify-content: flex-end;
`
export const BoxActionsDown = styled.View`
    width:100%;
    align-items: center;
`
export const ActionUp = styled.Text`
    width: 100%;
    justify-content: flex-end;
    
`
export const ActionDown = styled.Text`
    width: 100%;
    align-items: center;
    font-weight: bold;
`

export const BoxPriceDown = styled.View`
    width: 100%;
    align-items: flex-end;
`
export const TextPriceTrip = styled.Text`
    width: 100%;
    justify-content: flex-end;
    margin-right: 2px;
    color: black;
    font-weight: bold;
    
` 
export const ButtonPriceDown = styled.Button`
    width: 100%;
    color: white;
    background: black;
    padding: 10px;

`

export const BoxCalendar = styled.View`
    width: 100%;
    display : ${props => props.isVisible ? 'flex' : 'none'}
`


export const BoxLocal = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content:space-between;

`

export const Local = styled.View`
    width: 70%;
`