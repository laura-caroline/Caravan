import React, {useState, useEffect } from 'react'
import {WrapperForm, Form, Input, WrapperList, LinkList, Error  } from './styles.js'


const Search = () => {
    const [getCountys, setCountys] = useState([])
    const [getUfs, setUfs] = useState([])
    const [valueInput, setValueInput] = useState('')
    const [responseUfs, setResponseUfs] = useState([])
    const [responseCountys, setResponseCountys] = useState([])
    const [error, setError] = useState('')
    const handleChange = (event) => {
        const { value } = event.target
        setError('')
        if (!value) {
            setResponseUfs([])
            setResponseCountys([])

        }
        setValueInput(value)
        if (value.length > 3) {
            setValueInput(value)

            const regexp = new RegExp(`^${value}`, 'i')

            const ufs = getUfs.filter((item) => {
                return regexp.test(item.nome)
            })
            const filterUfs = ufs.map((uf) => {
                return {sigla: uf.sigla, nome: uf.nome }
            })
            const countys = getCountys.filter((county) => {
                return regexp.test(county.nome)
            })

            const filterCountys = countys.map((county) => {
                return { nome: county.nome, uf: county.microrregiao.mesorregiao.UF.sigla }
            })

            setResponseUfs(filterUfs)
            setResponseCountys(filterCountys)
        }
    }
    
    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then((res) => res.json()).then((date) => {
                const filteredUfs = date.map((item)=>{
                    return {sigla: item.sigla, nome: item.nome}
                })
                return setUfs(filteredUfs)
            })
    }, [])
    useEffect(() => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
            .then((res) => res.json()).then((date) => {

                return setCountys(date)
            })
    }, [])
    console.log(getUfs)
    return (
        <WrapperForm>
            <Form method="get" action={`/trip`}>
                <div style={{width:'90%', position:'relative'}}>
                    <Input name="q" value={valueInput} onChange={handleChange}/>
                    <WrapperList show={error? false : true}>
                        {responseUfs.length > 0 && responseUfs.map((item)=>{
                            return <LinkList href={`/trip?uf=${item?.nome}`}>{item.nome}</LinkList>
                        })}
                        {responseCountys.length > 0 && responseCountys.map((item,index)=>{
                            return (
                                <LinkList href={`/trip?c=${item.nome}`}>
                                    {item.nome}-{item.uf}
                                </LinkList>
                            )
                        })}
                </WrapperList>
                <div>
                
                </div>
                </div>
               
               
            </Form> 
            <Error>{error}</Error>
            
        </WrapperForm>
    )
}
export default Search

