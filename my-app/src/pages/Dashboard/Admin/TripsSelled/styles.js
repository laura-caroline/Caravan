import styled from 'styled-components/native'
    
export const BoxFilters = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
`
export const BoxFilter = styled.View`
    width: 100%;
    flex-direction: column;
    position: relative;
`
export const Receipt = styled.Text`
font-size: 18px;
    width: 100%;
`
export const BoxPrice = styled.View`
    width: 100%;
`

export const PriceTrip = styled.Text`
    width: 100%;
    font-size: 18px;
    align-items: flex-end;
    margin-right: 2px;
    color: black;
    font-weight: bold;
` 
export const Error = styled.Text`
    color: red;
`

export const BoxCalendar = styled.View`
    width: 100%;
    display: ${props => props.isVisible ? 'flex': 'none'};
`