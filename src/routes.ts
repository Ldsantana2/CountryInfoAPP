import { Router } from 'express'
import { countryInfo, listCountries } from './controladores/controladores'

const rotas = Router()

rotas.get('/api/available-countries', listCountries)

rotas.get('/api/country-info/:countryCode', countryInfo)

export default rotas
