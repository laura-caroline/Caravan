import React, {useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {
    BoxContent,
    BoxPossiblesLocals,
    Container,
    ErrorMessage,
    Input,
    Form,
    LinkList,
    ButtonSearch
} from './styles'


const Search = ({history}) => {
    const [citys, setCitys] = useState([])
    const [ufs, setUfs] = useState([])
    const [valueInput, setValueInput] = useState('')
    const [possiblesUfs, setPossiblesUfs] = useState([])
    const [possiblesCitys, setPossiblesCitys] = useState([])
    const [error, setError] = useState('')

    const handleChange = (event) => {
        const { value } = event.target
        setError('')
        if (!value) {
            setPossiblesUfs([])
            setPossiblesCitys([])
        }
        setValueInput(value)
        if (value.length > 3) {
            setValueInput(value)

            const regexp = new RegExp(`^${value}`, 'i')

            const regexpUfs = ufs.filter((uf) => {
                return regexp.test(uf.nome)
            })

            const regexpCitys = citys.filter((city) => {
                return regexp.test(city.nome)
            })

            const filterPossiblesUfs = regexpUfs.map((uf) => {
                return {
                    sigla: uf.sigla, 
                    nome: uf.nome
                 }
            })

            const filterPossiiblesCitys = regexpCitys.map((city) => {
                return { 
                    nome: city.nome,
                    uf: city.microrregiao.mesorregiao.UF.sigla 
                }
            })

            setPossiblesUfs(filterPossiblesUfs)
            setPossiblesCitys(filterPossiiblesCitys)
        }
    }
    
    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            const data = await response.json()
            const filteredUfs = data.map((item)=>{
                return {
                    sigla: item.sigla, 
                    nome: item.nome
                }
            })
            return setUfs(filteredUfs)
        })()
    }, [])

    useEffect(() => {
        (async()=>{
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
            const data = await response.json()
            setCitys(data)
        })()
    }, [])

    const handleSubmit = ()=>{
        console.log('aq')
        return history.push(`/trip?q=${valueInput}`)
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <BoxContent>
                <div style={{display: 'flex', border: '1px solid black', alignItems: 'center'}}>
                    <Input 
                        style={{border: 'none', outline: 0}}
                        value={valueInput} 
                        onChange={handleChange}
                    />
                    <ButtonSearch onSubmit={handleSubmit}>
                        <FaSearch size="18"/>
                    </ButtonSearch>
                </div>
                
                <BoxPossiblesLocals show={error? false : true}>
                    {possiblesUfs.length > 0 && possiblesUfs.map((uf)=>{
                        return (
                            <LinkList href={`/trip?uf=${uf?.nome}`}>
                                {uf.nome}
                            </LinkList>
                        )
                    })}
                    {possiblesCitys.length > 0 && possiblesCitys.map((city)=>{
                        return (
                            <LinkList href={`/trip?c=${city.nome}`}>
                                {city.nome}-{city.uf}
                            </LinkList>
                        )
                    })}
                </BoxPossiblesLocals>
            </BoxContent>
            <ErrorMessage>
                {error}
            </ErrorMessage>
            </Form>
        </Container>
    )
}
export default withRouter(Search)

