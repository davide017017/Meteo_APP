import React from 'react';
import { WiCloudy, WiRain, WiSnow, WiThunderstorm, WiDaySunny } from 'react-icons/wi';

interface MeteoBoxProps {
    weatherData: any;
}

const MeteoBox: React.FC<MeteoBoxProps> = ({ weatherData }) => {
    const weather = weatherData.weather?.[0];
    const description = weather?.description || 'Non disponibile';
    const main = weather?.main || 'Non disponibile';

    let icon, translatedDescription, backgroundColor, borderColor, radialGradient, iconColor;

    switch (main.toLowerCase()) {
        case 'clouds':
            icon = <WiCloudy className="text-9xl" />;
            translatedDescription = 'Nuvoloso';
            backgroundColor = 'bg-gray-300';
            borderColor = 'border-gray-600';
            radialGradient = 'radial-gradient-clouds';
            iconColor = 'text-gray-700';
            break;
        case 'rain':
            icon = <WiRain className="text-9xl" />;
            translatedDescription = 'Pioggia';
            backgroundColor = 'bg-blue-300';
            borderColor = 'border-blue-600';
            radialGradient = 'radial-gradient-rain';
            iconColor = 'text-blue-200';
            break;
        case 'snow':
            icon = <WiSnow className="text-9xl" />;
            translatedDescription = 'Neve';
            backgroundColor = 'bg-gray-200';
            borderColor = 'border-gray-200';
            radialGradient = 'radial-gradient-snow';
            iconColor = 'text-white';
            break;
        case 'thunderstorm':
            icon = <WiThunderstorm className="text-9xl" />;
            translatedDescription = 'Temporale';
            backgroundColor = 'bg-gray-500';
            borderColor = 'border-gray-500';
            radialGradient = 'radial-gradient-thunderstorm';
            iconColor = 'text-yellow-100';
            break;
        case 'clear':
            icon = <WiDaySunny className="text-9xl" />;
            translatedDescription = 'Sereno';
            backgroundColor = 'bg-yellow-100';
            borderColor = 'border-yellow-600';
            radialGradient = 'radial-gradient-clear';
            iconColor = 'text-yellow-400';
            break;
        default:
            icon = <WiCloudy className="text-9xl" />;
            translatedDescription = description;
            backgroundColor = 'bg-gray-100';
            borderColor = 'border-gray-300';
            radialGradient = 'radial-gradient-default';
            iconColor = 'text-gray-400';
    }

    return (
        <div className={`p-6 rounded-md shadow-md border ${borderColor} aspect-video flex flex-col items-center justify-center shadow-lg shadow-black/90 ${backgroundColor} ${radialGradient}`}>
            <div className={`${iconColor}`}>{icon}</div>
            <p className="text-2xl font-semibold text-black mt-4 text-center">{translatedDescription}</p>
            <div className="mt-2 text-center">
                <div className="flex flex-col items-center">
                    <span className="text-sm text-black">ID - {weather?.id}</span>
                    <span className="text-xs text-gray-700 opacity-70">Identificativo numerico univoco assegnato a questa specifica condizione meteorologica.</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-black">Main - {main}</span>
                    <span className="text-xs text-gray-700 opacity-70">Categoria generale che descrive le condizioni meteorologiche (es. Nuvoloso, Pioggia, Sereno).</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm text-black">Icon - {weather?.icon}</span>
                    <span className="text-xs text-gray-700 opacity-70">Codice dell'icona utilizzata per rappresentare visivamente questa condizione meteorologica.</span>
                </div>
            </div>
        </div>
    );
};

export default MeteoBox;