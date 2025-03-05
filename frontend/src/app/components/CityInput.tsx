// components/CityInput.tsx
"use client";

import { CityInputProps } from '@/types';
import { useState, ChangeEvent, KeyboardEvent, useRef } from 'react';

const CityInput: React.FC<CityInputProps> = ({ onFetchWeather }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false); // Aggiunto stato di caricamento
    const inputRef = useRef<HTMLInputElement>(null);

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY || '';

    const fetchCitySuggestions = async (input: string) => {
        if (!apiKey) {
            console.error("API key non trovata");
        return;
        }

        setIsLoading(true); 

        try {
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Errore nel recupero dei suggerimenti');
            }

            const data = await response.json();
            const cityNames = data.map((city: any) => city.name);
            setSuggestions(cityNames);
            setSelectedSuggestionIndex(-1);
        } catch (err: any) {
            console.error("Errore fetchCitySuggestions:", err);
            setSuggestions([]);
            setSelectedSuggestionIndex(-1);
        } finally {
            setIsLoading(false); // Imposta il caricamento a false
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);

        if (value.length > 1) {
            fetchCitySuggestions(value);
        } else {
            setSuggestions([]);
            setSelectedSuggestionIndex(-1);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Impedisci l'invio del form
            onFetchWeather(city);
            setSuggestions([]);
            setSelectedSuggestionIndex(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); // Impedisci lo scrolling della pagina
            setSelectedSuggestionIndex((prevIndex) =>
                Math.min(prevIndex + 1, suggestions ? suggestions.length - 1 : 0)
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault(); // Impedisci lo scrolling della pagina
            setSelectedSuggestionIndex((prevIndex) =>
                Math.max(prevIndex - 1, 0)
            );
        }
    };

    const handleSuggestionSelection = (index: number) => {
        setCity(suggestions[index]);
        setSuggestions([]);
        setSelectedSuggestionIndex(-1);
        onFetchWeather(suggestions[index]);
        inputRef.current?.focus();
    };

    return (
        <div className="flex flex-col items-center space-y-2 mb-4 w-full max-w-md mx-auto relative justify-center">
            <div className="flex w-full space-x-2">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Inserisci la città"
                    value={city}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-white border rounded-md p-3 flex-grow shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700"
                />
                <button
                    onClick={() => onFetchWeather(city)}
                    className="bg-blue-200 hover:bg-blue-600 hover:text-white text-blue-900 font-semibold py-3 px-6 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/90"
                >
                    Cerca
                </button>
            </div>
            {isLoading ? (
                <p className="mt-2">Caricamento suggerimenti...</p>
            ) : suggestions && suggestions.length > 0 ? (
                <ul className="mt-2 bg-white border rounded-md shadow-md w-full absolute top-full left-0 z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className={`p-3 hover:bg-violet-800 hover:text-white cursor-pointer transition-colors duration-200 ${selectedSuggestionIndex === index ? 'bg-blue-100' : ''
                                }`}
                            onClick={() => handleSuggestionSelection(index)}
                            onMouseOver={() => setSelectedSuggestionIndex(index)} // Evidenzia al passaggio del mouse
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default CityInput;