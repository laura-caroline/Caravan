import React, {useState} from 'react'
import {
    AskQuestion,
    AnswerQuestion
} from './styles'

const Query = ({q,res})=>{
    const [toggle, setToggle] = useState('off')
    const handleToggle = ()=>{
        const result = toggle === 'off' ? 'show': 'off'
        setToggle(result)
    }   
    return (
        <>
            <AskQuestion onClick={handleToggle}>{q}</AskQuestion>
            <AnswerQuestion show={toggle}>{res}</AnswerQuestion>
        </>
    )
}
export default Query