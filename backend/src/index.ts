import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import rotas from './routes'

const app = express()

// Configuração do CORS
app.use(cors())

app.use(express.json())
app.use(rotas)

app.listen(process.env.PORT)
