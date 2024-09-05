import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios'

interface Country {
  name: string;
}

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get<Country[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/countries`);
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name}>
            <Link href={`/country/${country.name}`}>
              <a>{country.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;