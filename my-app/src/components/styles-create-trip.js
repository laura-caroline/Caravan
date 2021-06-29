import styled from 'styled-components/native'

export const Container = styled.ScrollView`
    width: 100%;
`
export const BoxContent = styled.View`
    width: 100%;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
   
`
export const Title = styled.Text`
    font-size: 25px;
    margin-bottom: 20px;
`

export const BoxForm = styled.View`
    width: 100%;
`
export const BoxGroupSelects = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`

export const BoxGuide = styled.View`
    width: 100%;
    align-items:center;
    margin-bottom: 20px;
`

export const Label = styled.Text`
    width: 100%;
    margin: 10px 0px 10px 0px;
`
export const Input = styled.TextInput`
    width: 100%;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid gray;
    margin-bottom: 10px;
    
`
export const BoxList = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
   

`
export const Item = styled.View`
    width: 48%;
    color: black;
    margin: 10px 5px 10px 0px;
    padding: 10px;
    background: gray;
`
export const InputGuide = styled.TextInput`
    width: 50%;
    padding:10px;
    border: ${props => props.showErrors && '1px solid red'}
    
`
export const ButtomGuide = styled.Text`
    font-size: 40px;
`
export const Button = styled.Button`
    width: 20%;
    margin-top: 10px;
    background: #4300D2;
    padding: 10px;
`
export const BoxInclusion = styled.View`
    width: 100%;
    flex-direction: row;
`
export const BoxNotInclusion = styled.View`
    width: 100%;
    flex-direction: row;
`
export const BoxGroupSchedules = styled.View`
    width: 100%;
    flex-direction: row;

`
export const BoxSchedule = styled.View`
    width: 50%;

`
export const BoxLocal = styled.View`
    width: 100%;
    flex-direction: row;
`
export const Local = styled.View`
    width: 50%;
`
export const BoxNavigation = styled.View`
    width: 100%;
    align-items: center;
`
export const TextGuide = styled.Text`
    width: 20%;
    margin: 10px 5px 10px 0px;
    padding: 10px;
    background: gray;
`
export const Inclusion = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    border: 1px solid black;
`
export const NotInclusion = styled.View`
    width: 100%;
    flex-direction: row;
    align-content: center;
    border: 1px solid black;
`
export const Link = styled.Text`
    margin-top: 20px;
    color: black;   
`

export const AddItem = styled.Text`
    font-size: 23px;
`
export const ErrorMessage = styled.Text`
    color: red;

`