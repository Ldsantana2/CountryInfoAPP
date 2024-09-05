import { Router } from 'express'
import { countryInfo, listCountries} from './controllers/countries'


const routes = Router()

routes.get('/api/available-countries', listCountries)

routes.get('/api/country-info/:countryCode', countryInfo )


export default routes