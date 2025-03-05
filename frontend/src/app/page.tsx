"use client";

import { useState } from 'react';
import CityInput from '@/app/components/CityInput';
import WeatherDataDisplay from '@/app/components/WeatherDataDisplay';
import { WeatherData } from '@/types';

export default function Home() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchWeather = async (city: string) => {
        setError(null);
        setIsLoading(true);

        try {
            const url = `http://localhost:8090/?city=${city}`;
            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Città non trovata');
                } else {
                    throw new Error(`Errore HTTP: ${response.status} ${response.statusText}`);
                }
            }

            const data = await response.json();
            setWeatherData(data);
        } catch (err: any) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-200 to-pink-100 flex flex-col items-center justify-center p-3">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">Meteo App</h1>
                <p className="text-md text-gray-700">Inserisci il nome di una città per visualizzare le informazioni meteo.</p>
            </div>
            <div className="bg-gradient-to-b from-slate-100 to-blue-100 bg-opacity-80 backdrop-blur-lg p-3 md:p-6 rounded-2xl shadow-2xl shadow-black max-w-md md:max-w-2xl lg:max-w-5xl w-full">
                <CityInput onFetchWeather={fetchWeather} />
                {isLoading && (
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">Caricamento...</p>
                    </div>
                )}
                {weatherData && <WeatherDataDisplay weatherData={weatherData} error={error} />}
                {error && (
                    <div className="mt-4 text-center">
                        <p className="text-red-600 font-semibold">{error}</p>
                    </div>
                )}
            </div>
        </main>
    );
}