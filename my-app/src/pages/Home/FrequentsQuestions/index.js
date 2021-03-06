import React from 'react'
import Query from './query'
import {
    Container,
    Question,
    BoxQuestions,
} from './styles'

const Questions = () => {    
    return (
       <Container>
           <BoxQuestions>
               <Question>
                   <Query q= 'É possivel cancelar o passeio?' res= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veniam laudantium inventore doloremque, ipsa vel voluptates nam obcaecati officia totam, necessitatibus ea iusto nulla commodi doloribus aliquam labore nemo magni.'/>
               </Question>
               <Question>
                    <Query q= 'Qual o melhor desconto para o passeio?' res= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veniam laudantium inventore doloremque, ipsa vel voluptates nam obcaecati officia totam, necessitatibus ea iusto nulla commodi doloribus aliquam labore nemo magni.'/>
               </Question>
               <Question>
                    <Query q= 'Vocês dão descontos para grupos grandes?' res= 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veniam laudantium inventore doloremque, ipsa vel voluptates nam obcaecati officia totam, necessitatibus ea iusto nulla commodi doloribus aliquam labore nemo magni.'/>
               </Question>

           </BoxQuestions>
       </Container>
    )
}
export default Questions

