import styled from 'styled-components'
    

export const Container = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const BoxContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`
export const Title = styled.h2 `
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px 0px 10px 0px;
    font-size: 30px;
`
export const Receipt = styled.p``
export const BoxListTrips = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
export const BoxTrip = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    padding: 5px;
    border: 3px solid #ddd;
    border-radius: 10px;
    margin: 10px 5px 10px 5px
`
export const Image = styled.img`
    width: 100%;
    height: auto;
`
export const BoxDescription = styled.div`
    width: 100%;
    padding: 10px;
    display:flex;
    flex-direction: column;
`
export const TextLocal = styled.h4 `
    color: black;
    font-weight: bold;
`
export const BoxGroupButtons = styled.div `
    width: 100%;
    display:flex;
    align-items: center;
    margin-top: 10px;
`
export const BoxButton = styled.div`
    width: 40%;
    display:flex;
    flex-direction: column;
`
export const Label = styled.label `
    font-size: 12px;
    color: gray;
    font-weight: bold;
`
export const Input = styled.input`
    width: 80%;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
`
export const Select = styled.select`
    padding: 5px;
`
export const Option = styled.option``

export const BoxPrice = styled.div`
    width: 100%;
`

export const TextPriceTrip = styled.p `
    width: 100%;
    display:flex;
    justify-content: flex-end;
    margin-right: 2px;
    color: black;
    font-weight: bolder;
    
` 
export const MessageError = styled.span`
    color: red;
`

export const BoxCalendar = styled.div`
    display: ${props => props.isVisible ? 'block': 'none'};
    position: absolute;
    top: 30px;
`
export const BoxFilters = styled.div`
    display: flex;
    align-items: center;
`
export const BoxFilter = styled.div`
    display: flex;
    flex-direction: column;
    
    position: relative;
`