import styled from 'styled-components'


export const Container = styled.div `
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;    
    align-items: center;

`

export const BoxContent = styled.div `
    width: 80%;
    display:flex;
    flex-direction: column;
    align-items: center;

`

export const SubTitle = styled.h2 `
    width: 100%;
    display: flex;
    justify-content: center;
    text-transform: uppercase   
    @media(max-width: 1000px){
        font-size: 40px;
        
    }
`

export const Title = styled.h1 `
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 60px;
    color: #017AFD;

    @media(max-width: 1000px){
        font-size: 40px;
        
    }

`
export const BoxListAdvantages = styled.div `
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    
`
export const BoxAdvantage = styled.div `
    width: 25%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border: 1px solid gray;
    box-shadow: 7px 7px gray;

    &:hover{
        background: #ededed;
    }
    @media(max-width: 1000px){
        width: 100%;
        height: 200px;
    }
    
`
export const TitleItem = styled.h1 `
    font-size: 20px
    

`
export const DescriptionItem = styled.p `
    width: 60%;    
    text-align: center;
    font-size: 15px;        
`
export const Image = styled.img`
    width: 15%;
`