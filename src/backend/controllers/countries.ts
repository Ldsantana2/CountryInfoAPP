import 'dotenv/config'
import { Request, Response } from 'express'
import axios from 'axios'


export const listCountries = async (req: Request, res: Response) => {

    try {

        const countries = await axios.get('https://date.nager.at/api/v3/AvailableCountries')

        return res.json(countries.data)

    } catch (error) {

        console.error('Error fetching countries:', error)

        return res.status(500).send('Failed to fetch countries')
    }
}

    export const countryInfo = async (req: Request, res: Response) => {
        const { countryCode } = req.params
    
        try {

            const borderResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`)
            const borderCountries = borderResponse.data.borders

            const populationResponse = await axios.get('https://countriesnow.space/api/v0.1/countries/population');
            const flagResponse = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images');
    
        
            const populationData = populationResponse.data.data
            const flagData = flagResponse.data.data; 
            
            const populationInfo = populationData.filter((item: any) => {return item.code === countryCode})

            const flagInfo = flagData.filter((item: any) => { return item.code === countryCode})

            const countryInfo = {
                borders: borderCountries,
                population: populationInfo,
                flagUrl: flagInfo
            };
    
            return res.status(200).json(countryInfo)

        } catch (error) {

            console.error('Error fetching country info:', error)

            return res.status(500).send('Failed to fetch country info')
        }
    }
  
