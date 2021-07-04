const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const routes = require('./routes')

// Configurações
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Acessar routes a cada requisição
app.use(routes)

// Estatico para não ser visto como uma rota
app.use('/uploads', express.static(path.resolve(__dirname, '..','uploads')))

// Servidor online na porta 8080
app.listen(8080, ()=>{
    console.log('server online')
})


module.exports = app