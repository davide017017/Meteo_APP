import React from 'react';
import { WiStrongWind, WiShowers, WiCloudy, WiCloud } from 'react-icons/wi';
import { WeatherDetailsBoxProps } from '@/types';

// Funzione per determinare il colore della velocità del vento
const getWindSpeedColor = (speed: number | undefined): string => {
    if (speed === undefined) return 'text-gray-400';
    if (speed === 0) return 'text-blue-700'; // Calma
    if (speed <= 2) return 'text-blue-500'; // Brezza leggera
    if (speed <= 5) return 'text-green-600'; // Vento leggero
    if (speed <= 8) return 'text-green-800'; // Vento moderato
    if (speed <= 10) return 'text-yellow-800'; // Vento forte
    if (speed <= 12) return 'text-orange-600'; // Vento molto forte
    if (speed <= 18) return 'text-red-600'; // Vento molto forte
    return 'text-red-800'; // Tempesta
};

// Funzione per determinare il colore della visibilità
const getVisibilityColor = (visibility: number | undefined): string => {
    if (visibility === undefined) return 'text-gray-300';
    if (visibility === 0) return 'text-gray-100'; // Visibilità nulla
    if (visibility <= 1000) return 'text-gray-300'; // Visibilità molto bassa
    if (visibility <= 3000) return 'text-gray-400'; // Visibilità bassa
    if (visibility <= 5000) return 'text-gray-500'; // Visibilità media
    if (visibility <= 7000) return 'text-gray-600'; // Visibilità buona
    if (visibility <= 9000) return 'text-gray-700'; // Visibilità molto buona
    return 'text-gray-900'; // Visibilità eccellente
};

// Funzione per determinare il colore delle nuvole
const getCloudColor = (clouds: number | undefined): string => {
    if (clouds === undefined) return 'text-gray-300';
    if (clouds === 0) return 'text-gray-100'; // Cielo sereno
    if (clouds <= 10) return 'text-gray-200'; // Quasi sereno
    if (clouds <= 30) return 'text-gray-300'; // Poco nuvoloso
    if (clouds <= 50) return 'text-gray-400'; // Parzialmente nuvoloso
    if (clouds <= 70) return 'text-gray-500'; // Nuvoloso
    if (clouds <= 90) return 'text-gray-700'; // Molto nuvoloso
    return 'text-gray-900'; // Coperto
};

const WindCloudBox: React.FC<WeatherDetailsBoxProps> = ({ weatherData }) => {
    const { wind, visibility, clouds } = weatherData;
    const windSpeed = wind?.speed;
    const windDeg = wind?.deg;
    const cloudAll = clouds?.all;

    const getWindDirection = (deg: number | undefined): string => {
        if (deg === undefined) return 'N/A';
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round((deg % 360) / 45);
        return directions[index % 8];
    };

    return (
        <div className="h-fit p-2 gap-1 rounded-lg shadow-md shadow-black border border-gray-200 flex flex-col lg:flex-row justify-between items-center w-full">
            <div className="text-center">
                <div className="flex items-center justify-center">
                    <p className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                        Vento <WiStrongWind className="inline-block ml-1 text-xl text-blue-500" />
                    </p>
                </div>
                <p className={`text-sm text-gray-900 whitespace-nowrap ${getWindSpeedColor(windSpeed)}`}>
                    Speed: {windSpeed} m/s
                </p>
                <p className="text-sm text-gray-900 whitespace-nowrap flex flex-col items-center justify-center">
                    Provenienza: {getWindDirection(windDeg)} ({windDeg}°)<span className="ml-1">
                        <svg viewBox="0 0 100 100" width="16" height="16" className="text-gray-500" style={{ transform: `rotate(${windDeg + 90}deg)` }}>
                            <path d="M 50,10 L 90,50 L 50,90 L 50,60 L 10,60 L 10,40 L 50,40 Z" fill="currentColor" />
                        </svg>
                    </span>
                    <span className="text-xs text-gray-600">Direzione del vento</span>
                </p>
            </div>

            <div className="text-center mt-2 md:mt-0 overflow-hidden">
                <div className="flex items-center justify-center">
                    <p className="text-md font-semibold text-gray-900 whitespace-nowrap">
                        Visibilità e Nuvole <WiCloud className="inline-block ml-1 text-xl text-gray-500" />
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <p className={`text-sm whitespace-nowrap ${getVisibilityColor(visibility)}`}>
                        <WiShowers className="inline-block mr-1 text-xl text-blue-300" />
                        Visibilità: {visibility} metri
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <p className={`text-sm whitespace-nowrap ${getCloudColor(cloudAll)}`}>
                        <WiCloudy className="inline-block mr-1 text-xl text-gray-400" />
                        Nuvole: {cloudAll}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WindCloudBox;