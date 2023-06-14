// config inicial
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')
const app = express()
const cors = require('cors')

// forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(cors({
  origin: '*'
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Rotas da API
const PersonRoutes = require('./routes/personRoutes')
app.use('/person', PersonRoutes)

// Rota Inicial / endpoint
app.get("/", (req, res) => {
  res.json({ message: 'Hello express!' }) // o message, pode ser qualquer outro nome desejado
})


app.get("/terms", (req, res) => {
  res.json({ message: 'Termos de Serviço!' }) // o message, pode ser qualquer outro nome desejado
})

// entregar uma porta para acessar
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@apicluster.joddjgl.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connected MongoDB!")
    app.listen(3000)
  })
  .catch((err) => console.log(err))
