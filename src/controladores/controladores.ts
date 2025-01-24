import 'dotenv/config'
import { Request, Response } from 'express'
import axios from 'axios'

export const listCountries = async (req: Request, res: Response) => {
    try {
        const countries = await axios.get(
            'https://date.nager.at/api/v3/AvailableCountries'
        )

        return res.json(countries.data)
    } catch (error) {
        console.error('Error fetching countries:', error)

        return res.status(500).send('Failed to fetch countries')
    }
}

export const countryInfo = async (req: Request, res: Response) => {
    const { countryCode } = req.params

    try {
        const countryData = await axios.get(
            `https://date.nager.at/api/v3/CountryInfo/${countryCode}`
        )

        const countryName = countryData.data.commonName

        const borderCountries = countryData.data.borders.map(
            (border: {
                commonName: any
                officialName: any
                countryCode: any
                region: any
            }) => {
                const { commonName, officialName, countryCode, region } = border
                return { commonName, officialName, countryCode, region }
            }
        )

        const populationResponse = await axios.post(
            'https://countriesnow.space/api/v0.1/countries/population',
            {
                country: countryName,
            }
        )

        const populationData = populationResponse.data.data

        const flagResponse = await axios.post(
            'https://countriesnow.space/api/v0.1/countries/flag/images',
            {
                country: countryName,
            }
        )

        const flagData = flagResponse.data.data

        const response = {
            name: countryName,
            borders: borderCountries,
            population: populationData,
            flagUrl: flagData,
        }

        return res.status(200).json(response)
    } catch (error) {
        console.error('Error fetching country info:', error)

        return res.status(500).send('Failed to fetch country info')
    }
}
