import styled from 'styled-components/native'


export const Container = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`

export const BoxQuestions = styled.View`    
    width: 70%;

`
export const Question = styled.View`
    width: 100%;
    margin-bottom: 40px;

`
export const AskQuestion = styled.Text`
    width: 100%;
    color: #017afd;
    font-size: 20px;
`
export const AnswerQuestion = styled.Text`
    width: 100%;
    font-size: 15px;
    color: black;
    display: ${props => props.isVisible ? 'flex': 'none'};
`

