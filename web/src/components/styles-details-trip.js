import styled, {keyframes} from 'styled-components'

 // Selecionado

export const Container = styled.div`
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const ClusterSelected = styled.h2`
    max-width: 100%;
    display:flex;
    padding: 10px;
    color: white;
    font-weight: bold;
    background: #4300D2;
`
export const Image = styled.img`
    width: 200px;
`
export const BoxTrip = styled.div`
    width: 100%;
    display: flex;
    background: white;
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
export const BoxListInclusions = styled.div`
    width: 100%;
    display: flex;
    margin: 20px 0px 20px 0px;
`
export const BoxInclusion = styled.div`
    width: 70%;   
`
export const TitleInclusion = styled.h4`
    color: gray;   
`
export const ListItemsInclusion = styled.ul`
    width: 50%; 
    padding: 0px;
`
export const ItemInclusion = styled.li`
    width: 100%;
    display:flex;
    padding: 3px;
    text-indent: 15px;
`
export const BoxGroupButtons = styled.div `
    width: 100%;
    display:flex;
    align-items: center;
    margin-top: 10px;
`
export const BoxButton = styled.div`
    width: 30%;
    position:relative;
    display:flex;
    flex-direction: column;
`
export const Label = styled.label `
    font-size: 12px;
    color: gray;
    font-weight: bold;
`   
export const Select = styled.select``
export const Option = styled.option``

export const BoxPriceRight = styled.div`
    width: 30%;
    margin: 10px 0px 10px 0px;
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`
export const TextDetailPrice = styled.h4`
    text-align:center;
    color: gray;
`
export const TextPrice = styled.h2`
    text-align:center;
    color: black;
    font-weight: bold;
`
export const ButtonToAddBag = styled.button`
    max-width: 100%;
    cursor: pointer;
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 10px;
    background: #4300D2;
`
export const BoxContent = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 1px solid #4300D2;
`
export const ListDuration = styled.ul`
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    padding: 0px;
`
export const Text = styled.p`
    width: 100%;
    display:flex;
`
export const Input = styled.input`
    width: 80%;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
`
export const WrapperCalendar = styled.div`
    position: absolute;
    top:40px;
    display: ${(props)=> props.show ? 'block' : 'none'} 
    
`


// Component DashBoard Default

export const BoxListTrips = styled.div`
    width: 100%;
    display:flex;
    align-items:center;
    justify-content: center;
    flex-wrap: wrap;
`
