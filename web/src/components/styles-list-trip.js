import styled, {keyframes} from 'styled-components'


export const Container = styled.div`
    width: 100%;
`
export const BoxContent = styled.div`
    width: 100%;
`
export const BoxListTrips = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`
export const BoxTrip = styled.div`
    min-width: 20%;
    background: white;
    margin: 15px;
    padding: 10px;
    border: 1px solid gray;
    box-shadow: 5px 5px gray;
`
export const Image = styled.img `
    width: 300px;
    height: auto;  

`
export const Title = styled.h1 `
    font-size: 20px;
`
export const BoxDescriptionTrip = styled.div`
    width: 100%;  
    background: white;  
    display:flex;
    flex-direction: column;
    align-items: center;
`
export const Text = styled.p`
    width: 100%;
    font-size: 15px;
    font-weight:bolder;
    text-align:center;
`
export const Button = styled.button`
    width: 50%;
    margin-left: 10px;
    padding: 10px;
    color: white;
    background: #4300D2;
    text-align: center;
    text-decoration: none;   
`
export const BoxGroupActions = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
export const Link = styled.a`
    width: 10%;
    cursor: pointer;   
`
