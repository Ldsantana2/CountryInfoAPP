// pages/country/[name].tsx
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PopulationOverTime {
  year: number;
  population: number;
}

interface BorderCountry {
  name: string;
}

interface Country {
  name: string;
  flagUrl: string;
  borders: BorderCountry[];
  populationOverTime: PopulationOverTime[];
}

const CountryInfo: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;
  const [country, setCountry] = useState<Country | null>(null);
  const [chartData, setChartData] = useState<{
    labels: number[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchCountry = async () => {
      if (!name || typeof name !== 'string') return;
      try {
        const { data } = await axios.get<Country>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/country/${name}`);
        setCountry(data);

        // Prepare chart data
        const labels = data.populationOverTime.map(item => item.year);
        const dataset = {
          label: `${data.name} Population`,
          data: data.populationOverTime.map(item => item.population),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        };

        setChartData({ labels, datasets: [dataset] });
      } catch (error) {
        console.error('Error fetching country info:', error);
      }
    };

    fetchCountry();
  }, [name]);

  return (
    <div>
      {country && (
        <>
          <h1>{country.name}</h1>
          <img src={country.flagUrl} alt={`${country.name} flag`} style={{ width: 100, height: 60 }} />
          <h2>Border Countries</h2>
          <ul>
            {country.borders.map((borderCountry) => (
              <li key={borderCountry.name}>
                <Link href={`/country/${borderCountry.name}`}>
                  <a>{borderCountry.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <h2>Population Over Time</h2>
          <Line data={chartData} />
        </>
      )}
    </div>
  );
};

export default CountryInfo;