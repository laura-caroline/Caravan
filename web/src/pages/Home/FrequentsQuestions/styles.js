import styled from 'styled-components'


export const Container = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`

export const WrapperQuestions = styled.div `
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media(max-width: 1000px){
        width: 70%;
    }



`
export const Question = styled.div `
    width: 100%;
    margin-bottom: 40px;

`
export const AskQuestion = styled.p`
    width: 100%;
    color: #017afd;
    cursor: pointer;
    font-size: 20px;

    &:hover{
        text-decoration: underline;
    }

`
export const AnswerQuestion = styled.span `
    width: 100%;
    font-size: 15px;
    color: black;
    display: none;

    ${props => props.show === 'show' && `
        display: block;
    `}

`

