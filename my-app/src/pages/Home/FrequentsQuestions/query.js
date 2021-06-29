import React, {useState} from 'react'
import {
    AskQuestion,
    AnswerQuestion
} from './styles'

const Query = ({q,res})=>{
    const [isVisible, setIsVisible] = useState(false)

    const  handleToggle = ()=>{
        const result = isVisible ? false : true
        setIsVisible(result)
    }   
    return (
        <>
            <AskQuestion onPress={handleToggle}>{q}</AskQuestion>
            <AnswerQuestion isVisible={isVisible}>{res}</AnswerQuestion>
        </>
    )
}
export default Query