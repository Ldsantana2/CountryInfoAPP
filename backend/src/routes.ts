import { Router } from 'express'
import {
    countryInfo,
    findIso3Code,
    listCountries,
} from './controladores/controladores'

const rotas = Router()

rotas.get('/api/available-countries', listCountries)

rotas.get('/api/get-code/:countryCode', findIso3Code)

rotas.get('/api/country-info/:countryCode', countryInfo)

export default rotas
