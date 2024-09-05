import express, { json } from 'express'
import 'dotenv/config'
import routes from './routes'
import '../styles/globals.css';


const app = express()

app.use(express.json())
app.use(routes)

app.get('/', (req, res) => {
    return res.json('ok')
})

app.listen(process.env.PORT, () => {
    console.log('Server started')
})