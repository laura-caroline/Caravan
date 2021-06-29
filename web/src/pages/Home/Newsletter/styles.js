import styled from 'styled-components'

export const Container = styled.div` 
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;    
    padding : 0px;
    margin: 0px;
    background: #343A40;

   
`
export const BoxCarrosel = styled.div ` 
    width: 60%;
    @media(max-width: 1000px){
        width: 100%;
    }
`
export const Image = styled.img ` 
    width: 100%;
`
export const BoxNewsletter = styled.div ` 
    width: 35%;
    padding: 20px;
    display: flex;
    flex-direction : column;
    justify-content: center;
    @media(max-width: 1000px){
        width: 100%;
        padding: 20px;
    }
`
export const Title = styled.h1 ` 
    width: 100%;
    color: white;
    font-size: 20px; 
`
export const Description = styled.p ` 
    width: 100%;
    color: white;
    font-size: 15px;
    margin: 5px 0px 5px 0px;
`