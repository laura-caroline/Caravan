import styled from 'styled-components'

export const Container = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
export const BoxContent = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const Title = styled.h2`
    display: flex;
    align-items: center;
    margin: 10px 0px 10px 0px;
    
`
export const BoxTrips = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
export const BoxTrip = styled.div`
    width: 30%;
    padding: 5px;
    border: 3px solid #ddd;
    border-radius: 10px;
    margin: 10px 5px 10px 5px;

    @media(max-width: 800px) {
        width: 100%;
    }

`
export const BoxDescription = styled.div`
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    


`

export const Image = styled.img`
    width: 100%;
`
export const Local = styled.p``
export const BoxGroupButtons = styled.div`
    width: 100%;
    display: flex;
`
export const BoxButton = styled.div`
    width: 40%;
`
export const Label = styled.label`
    width: 100%;
`
export const Input = styled.input`
    width: 100%;
`
export const Select = styled.select`
    width: 100%;
`
export const Option = styled.option`
    width: 100%;
`
export const BoxPrice = styled.div`
    width: 100%;
`
export const PriceTrip = styled.p`
`
export const LinkInformation = styled.a`
    display: flex;
    justify-content: center;
    text-decoration: none;
    color: white;
    background: #027afd;
    margin: 10px;
    padding: 5px;
`
export const WarningEmptyTrips = styled.p`
    color: red;
`