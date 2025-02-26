import 'dotenv/config'
import { Request, Response } from 'express'
import axios from 'axios'

interface Country {
    Iso2: string
    Iso3: string
}

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

export const findIso3Code = async (req: Request, res: Response) => {
    const { countryCode } = req.params

    try {
        // Make the API request to get all country data
        const response = await axios.get(
            'https://countriesnow.space/api/v0.1/countries/iso'
        )
        const data = response.data

        // Check if API returned data successfully
        if (data.error) {
            return res.status(500).json({ error: data.msg })
        }

        // Find the country object with the matching Iso2 code
        const country = (data.data as Country[]).find(
            (item) => item.Iso2 === countryCode
        )

        // If the country is found, return the Iso3 code
        if (country) {
            return res.json({ iso3: country.Iso3 })
        } else {
            return res.status(404).json({ error: 'Country not found' })
        }
    } catch (error) {
        console.error('Error fetching country data:', (error as Error).message)
        return res.status(500).json({ error: 'Failed to fetch country data' })
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

        // Fetch population data
        const populationResponse = await axios.get(
            'https://countriesnow.space/api/v0.1/countries/population'
        )

        const populationData = populationResponse.data.data.find(
            (country: { code: string }) => country.code === countryCode
        )
        const flagResponse = await axios.get(
            'https://countriesnow.space/api/v0.1/countries/flag/images'
        )

        const flagData = flagResponse.data.data.find(
            (country: { iso3: string }) => country.iso3 === countryCode
        )

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
