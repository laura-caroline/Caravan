import styled from 'styled-components'

export const Container = styled.div `
    width: 100%;
`
export const BoxContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
   
`
export const Title = styled.h1``

export const Form = styled.form `
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 800px){
        width: 90%;
    }
`
export const BoxGroupSelects = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export const BoxGuide = styled.div`
    width: 100%;
    display: flex;
    align-items:center;
    margin-bottom: 20px;
`

export const LabelGuide = styled.label `
    width: 5%;
`
export const Select = styled.select `
    width: 100%;
    padding: 10px;
`
export const Option = styled.option`
    width: 100%
`
export const Label = styled.label`
    width: 100%;
    margin: 10px 0px 10px 0px;
`
export const Input = styled.input`
    width: 100%;
    padding:10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    
    :focus{
        outline: 0;
    }
`
export const BoxList = styled.div `
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
   

`
export const Item = styled.div`
    width: 20%;
    margin: 10px 5px 10px 0px;
    padding: 10px;
    background: gray;
    display: flex;
    cursor: pointer;
`
export const InputGuide = styled.input `
    width: 50%;
    padding:10px;
    border: ${props => props.showErrors && '1px solid red'}
    
`
export const ButtomGuide = styled.a `
    font-size: 40px;
    cursor: pointer;
`
export const Buttom = styled.button `
    width: 20%;
    margin-top: 10px;
    background: #4300D2;
    padding: 10px;
`
export const BoxInclusion = styled.div`
    width:100%;
    display:flex;
`
export const BoxNotInclusion = styled.div`
    width:100%;

    display:flex;
`
export const BoxGroupSchedules = styled.div`
    width: 100%;
    display: flex;

`
export const BoxSchedule = styled.div`
    width: 50%;

`
export const TextGuide = styled.p`
    width: 20%;
    margin: 10px 5px 10px 0px;
    padding: 10px;
    background: gray;
    display: flex;
    cursor: pointer;
`
export const Inclusion = styled.div`
    width: 100%;
    display: flex;
    alignContent: center;
    justifyContent: flex-between;
    border: 1px solid black;
`
export const NotInclusion = styled.div`
    width: 100%;
    display: flex;
    alignContent: center;
    justifyContent: flex-between;
    border: 1px solid black;
`
export const Link = styled.a `
    margin-top: 20px;
    cursor: pointer;
    color: black;
    text-decoration: none;
    
    
`
export const ErrorMessage = styled.p`
    width: 100%;
    color: red;
`

export const BoxUf = styled.div`
    width: 50%;
`
export const BoxCity = styled.div`
    width: 50%;

`
export const ButtonAdd = styled.span`
    font-size: 25px;
`