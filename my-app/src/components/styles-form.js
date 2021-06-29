import styled from 'styled-components/native'

export const Container = styled.ScrollView`
    width: 100%;
    height: 100%;
    background: white;
`
export const BoxContent = styled.View`
    width: 100%;
    height: 80%;
    align-items: center;
    justify-content: center;
`
export const Content = styled.View`
    width: 80%;
    margin-top: 20px;
`
export const Title = styled.Text `
    text-align: center;
    marginBottom: 40px;
    font-size: 20px;   
`
export const BoxNavigation = styled.View`
    width: 100%;
    flex-direction: row;
    margin-top: 70px;
    justify-content: flex-end;

`
export const Label = styled.Text`
    width: 100%;
    marginVertical: 10px;
`
export const Input = styled.TextInput`
    width: 100%;
    border-radius: 5px;
    padding: 15px;
    border: 1px solid #ddd;
`
export const Button = styled.Button`
    width: 100%;
`
export const Link = styled.Text`
    text-decoration: underline;
    margin-right: 10px;
`
export const MessageError = styled.Text`
    color: red;
`