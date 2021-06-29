import styled, { keyframes } from 'styled-components'

export const BoxContent = styled.div`
    border-bottom: 1px solid black;
`
const fadeIn = keyframes`
    0%{
        transform: scale(0)
    }
    100%{
        transform: scale(1);
    }
`
export const Container = styled.div `
    
    display: ${props => props.show ? 'block' : 'none'};
    position: absolute;
    background: white;
    left: -120px;
    border: 1px solid black;
    box-shadow: 2px 2px black;
    animation: ${fadeIn} 0.2s forwards;
`
export const Image = styled.img `
    width: 200px;
`
export const BoxActionsDown = styled.div`
    width:100%;
    display: flex;
    align-items: center;
`
export const ActionDown = styled.a`
    width: 100%;
    display:flex;
    align-items: center;
    cursor: pointer;
    font-weight: bolder;
`
export const TextPriceTrip = styled.p `
    width: 100%;
    display:flex;
    justify-content: flex-end;
    margin-right: 2px;
    color: black;
    font-weight: bolder;
    
` 