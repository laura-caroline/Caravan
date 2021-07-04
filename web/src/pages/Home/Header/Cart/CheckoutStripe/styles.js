import styled from 'styled-components'


export const BoxContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const BoxContent = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
`

export const BoxDescriptionShopping = styled.div`
  width: 50%;
  height: 100%;
  padding: 40px;

`
export const BoxDataPayment = styled.div`
  width: 50%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
`
export const BoxTrip = styled.div`
  width: 100%; 
  display: flex;
  margin: 10px 0px 10px 0px;
  padding: 5px;
  box-shadow: 0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0,0,0,.07), 0 1px 1.5px 0 rgba(0,0,0,.05)
  
`
export const ImageTrip = styled.img`
  width: 200px;
  height: 200px;

  
`
export const DescriptionTrip = styled.div`
  margin-left: 10px;
  
`

export const NameTrip = styled.h4` color: rgba(26,26,26,.9)`
export const DateTrip = styled(NameTrip)``
export const DurationTrip =styled(NameTrip)``
export const NumbersPeopleTrip = styled(NameTrip)``
export const ValueTrip = styled(NameTrip)``
export const Form = styled.form`
  width: 70%;
  height: 100%;
  margin: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`
export const Title = styled.h1`
  font-weight: 500;
  color: rgba(26,26,26,.9);
`
export const BoxCardData = styled.div`
  width: 100%;
  margin: 20px 0px 20px 0px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0,0,0,.07), 0 1px 1.5px 0 rgba(0,0,0,.05)
`
export const BoxCardItem = styled.div`
  width: 100%;
  margin: 20px 0px 20px 0px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 0 1px #e0e0e0, 0 2px 4px 0 rgba(0,0,0,.07), 0 1px 1.5px 0 rgba(0,0,0,.05)
`
export const Label = styled.label``

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: 0;
`

export const BoxContentCart = styled.div``
export const ButtonSubmit = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  box-sizing: content-box;
  background-color: rgb(0, 116, 212);
  color: rgb(195 190 190);
`



