import styled, {keyframes} from 'styled-components/native'

 // Selecionado

export const Container = styled.ScrollView`
    width: 100%;
`

export const BoxContent = styled.View`
    width: 100%;
    border: 1px solid #4300D2;
`
export const ClusterSelected = styled.Text`
    width: 100%;
    padding: 10px;
    font-size: 25px;
    color: white;
    font-weight: bold;
    background: #4300D2;
`

export const BoxTrip = styled.View`
    width: 100%;
    background: white;
`

export const BoxDescription = styled.View`
    width: 100%;
    padding: 10px;
`
export const Day = styled.Text`
    width: 100%;
`
export const Text = styled.Text`
    width: 50%;
`

export const ListDuration = styled.View`
    width: 100%;
    flex-direction: row;
    margin: 10px 0px 10px 0px;
`

export const BoxListInclusions = styled.View`
    width: 100%;
    flex-direction: row;
    margin: 20px 0px 20px 0px;
`
export const BoxInclusion = styled.View`
    width: 50%;   
`

export const ListItemsInclusion = styled.View`
    width: 100%; 
`

export const TitleInclusion = styled.Text`
    color: gray;   
`

export const ItemInclusion = styled.Text`
    width: 100%;
    padding: 3px;
`
export const BoxCalendar = styled.View`
    width: 100%;
    display : ${props => props.isVisible ? 'flex' : 'none'}
`
export const BoxGroupButtons = styled.View`
    width: 100%;
    align-items: center;
    flex-direction: row;
    margin-top: 10px;
`
export const BoxButton = styled.View`
    width: 30%;
    position:relative;
`

export const Label = styled.Text`
    font-size: 12px;
    color: gray;
    font-weight: bold;
`   

export const Input = styled.TextInput`
    width: 80%;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
`



export const BoxPrice = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 0px 20px 0px;

`

export const TextLocal = styled.Text`
    color: black;
    font-weight: bold;
`
export const TextDetailPrice = styled.Text`
    font-size: 18px;
    color: black;
`
export const TextPrice = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: black;
`

export const ButtonToAddBag = styled.Button`
    
`
