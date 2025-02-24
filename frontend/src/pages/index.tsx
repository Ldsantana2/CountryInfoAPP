'use client'

import { useState, useEffect } from 'react'

export default function Home() {
    const [countries, setCountries] = useState<any[]>([])
    const [selectedCountry, setSelectedCountry] = useState<string>('')
    const [countryInfo, setCountryInfo] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        fetch('http://localhost:3000/api/available-countries')
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch(() => setError('Erro ao buscar países'))
    }, [])

    useEffect(() => {
        if (!selectedCountry) return
        setLoading(true)
        fetch(`http://localhost:3000/api/country-info/${selectedCountry}`)
            .then((response) => response.json())
            .then((data) => setCountryInfo(data))
            .catch(() => setError('Erro ao buscar informações do país'))
            .finally(() => setLoading(false))
    }, [selectedCountry])

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem]">
                <h1 className="text-3xl font-semibold text-center mb-4 text-blue-600">
                    Selecione um País
                </h1>

                <select
                    defaultValue=""
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Escolha um país
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

                {loading && <p className="text-center mt-4">Carregando...</p>}
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}

                {countryInfo && (
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                            {countryInfo.name}
                        </h2>
                        {countryInfo.flagUrl && (
                            <img
                                src={countryInfo.flagUrl.flag}
                                alt={`Bandeira de ${countryInfo.name}`}
                                className="w-full h-auto rounded-md mb-4"
                            />
                        )}
                        {countryInfo.borders?.length > 0 && (
                            <p>
                                <strong>Região:</strong>{' '}
                                {countryInfo.borders[0].region}
                            </p>
                        )}
                        <p>
                            <strong>População:</strong>{' '}
                            {
                                countryInfo.population?.populationCounts.slice(
                                    -1
                                )[0]?.value
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
