import styled, {keyframes} from 'styled-components'

const fadeIn = keyframes`
    0%{
        transform: scale(0)
    }
    100%{
        transform: scale(1);
    }
`

export const Container = styled.div `
    min-width: 100%;
    display: ${props => props.show ? 'block' : 'none'};
    position: absolute;
    left: -120px;
    border: 1px solid black;
    box-shadow: 2px 2px black;
    background: white;
    animation: ${fadeIn} 0.2s forwards;
`

export const BoxPrice = styled.div`
    width: 100%;

`
export const Button = styled.div`
    max-width: 100%;
    cursor: pointer;
    background: black;
    color: white;
    padding: 10px;
    text-align: center;
`
export const TextEmpty = styled.h4`
    width: 100%;
    text-align: center;
`
export const TextNotAuthenticate = styled.h4`
    width: 100%;
    text-align: center;
`
