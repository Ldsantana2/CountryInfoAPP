'use client'

import { useState, useEffect } from 'react'

export default function Home() {
    const [language, setLanguage] = useState<'pt' | 'en'>('en')
    const [countries, setCountries] = useState<any[]>([])
    const [selectedCountryCode, setSelectedCountryCode] = useState<string>('')
    const [countryInfo, setCountryInfo] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [iso3Code, setIso3Code] = useState<string>('')

    useEffect(() => {
        fetch('http://localhost:3000/api/available-countries')
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch(() =>
                setError(
                    language === 'en'
                        ? 'Error fetching countries'
                        : 'Erro ao buscar países'
                )
            )
    }, [language])

    useEffect(() => {
        if (!selectedCountryCode) return
        setLoading(true)

        fetch(`http://localhost:3000/api/get-code/${selectedCountryCode}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('ISO3 API Response:', data)
                if (data && data.iso3) {
                    setIso3Code(data.iso3)
                } else {
                    throw new Error('Invalid ISO3 response')
                }
            })
            .catch(() => {
                setError(
                    language === 'en'
                        ? 'Error fetching country code'
                        : 'Erro ao buscar código do país'
                )
            })
            .finally(() => setLoading(false))
    }, [selectedCountryCode, language])

    useEffect(() => {
        if (!iso3Code) return
        setLoading(true)

        fetch(`http://localhost:3000/api/country-info/${iso3Code}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('Country Info Response:', data)
                setCountryInfo(data)
            })
            .catch(() =>
                setError(
                    language === 'en'
                        ? 'Error fetching country information'
                        : 'Erro ao buscar informações do país'
                )
            )
            .finally(() => setLoading(false))
    }, [iso3Code, language])

    const latestPopulation =
        countryInfo?.population?.populationCounts?.slice(-1)[0]
    const latestYear = latestPopulation ? latestPopulation.year : null
    const latestPopulationValue = latestPopulation
        ? latestPopulation.value.toLocaleString('pt-BR')
        : 'N/A'

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-400 relative">
            {/* App Name in the Top Left */}
            <div className="absolute top-4 left-4 text-xl font-bold text-white bg-gray-800 px-4 py-2 rounded-lg shadow-md">
                CountryInfoApp
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem]">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() =>
                            setLanguage(language === 'pt' ? 'en' : 'pt')
                        }
                        className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200"
                    >
                        <img
                            src={
                                language === 'pt'
                                    ? 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg'
                                    : 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg'
                            }
                            alt="Language flag"
                            className="w-6 h-4 rounded"
                        />
                        {language === 'pt' ? 'Português' : 'English'}
                    </button>
                </div>

                <h1 className="text-3xl font-semibold text-center mb-4 text-black">
                    {language === 'pt'
                        ? 'Selecione um País'
                        : 'Select a Country'}
                </h1>

                <select
                    defaultValue=""
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        {language === 'pt'
                            ? 'Escolha um país'
                            : 'Choose a country'}
                    </option>
                    {countries.map((country) => (
                        <option
                            key={country.countryCode}
                            value={country.countryCode}
                        >
                            {country.name}
                        </option>
                    ))}
                </select>

                {loading && (
                    <p className="text-center mt-4">
                        {language === 'pt' ? 'Carregando...' : 'Loading...'}
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}

                {countryInfo && (
                    <div className="mt-6 bg-gray-200 p-4 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold text-black mb-2">
                            {countryInfo.name}
                        </h2>
                        {countryInfo.flagUrl && (
                            <img
                                src={countryInfo.flagUrl.flag}
                                alt={`Bandeira de ${countryInfo.name} / Flag of ${countryInfo.name}`}
                                className="w-full h-auto rounded-md mb-4"
                            />
                        )}
                        <p>
                            <strong>
                                {language === 'pt' ? 'População' : 'Population'}
                                :
                            </strong>{' '}
                            {latestPopulationValue}
                        </p>
                        {latestYear && (
                            <p>
                                <strong>
                                    {language === 'pt' ? 'Ano' : 'Year'}:
                                </strong>{' '}
                                {latestYear}
                            </p>
                        )}

                        {countryInfo.borders?.length > 0 && (
                            <div className="mt-4">
                                <strong>
                                    {language === 'pt'
                                        ? 'Países Vizinhos'
                                        : 'Bordering Nations'}
                                    :
                                </strong>
                                <ul className="list-disc list-inside mt-2">
                                    {countryInfo.borders.map((border: any) => (
                                        <li key={border.countryCode}>
                                            {border.commonName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
