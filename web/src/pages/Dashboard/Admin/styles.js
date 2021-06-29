import styled from 'styled-components'

export const BoxFilters = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0px 10px 0px;
`
export const BoxFilter = styled.div`
    width: 100%;
    display: flex;
`
export const Select = styled.select`
    width: 20%;
    padding: 10px;

    @media(max-width: 800px){
        width: 50%;
    }
`
export const Option = styled.option`
    width: 100%;
`
export const Warning = styled.span`
    color: red;
`

export const BoxModalDelete = styled.div`
    width: 40%;
    height: 200px;
    display: ${props => props.isVisible ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute; 
    
`
export const BoxDescriptionModal = styled.div`
    height: 70%;
    padding: 20px;
    background: #7A7878;
`
export const TitleModal = styled.h4`
    margin-bottom: 5px;
    color: white;
   
`
export const SubTitleModal = styled.p`
    color: white;
`
export const BoxButtonsModal = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding: 10px; 
    box-sizing: border-box; 
    background: #484646;
    align-items: center;
`
export const ButtonCancel = styled.a`
    cursor: pointer;
    margin-right: 30px;
    color: white;
`
export const ButtonDelete = styled.button`
    display: flex;
    align-items: center;
    padding: 10px;
    background: #CB4848;
    color: white;
    border-radius: 5px;
    border: none; 
`
export const Button = styled.button`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin-left: 10px;
    padding: 10px;
    color: white;
    background: #4300D2;
    text-align: center;
    text-decoration: none;   

    @media(max-width: 800px){
        width: 50%;
    }
    
`