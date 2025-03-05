// components/WeatherDataDisplay.tsx

import { WiTime3 } from 'react-icons/wi';
import { FaMapPin } from 'react-icons/fa';

import MeteoBox from './box/MeteoBox';
import MainBox from './box/MainBox';
import SysBox from './box/SysBox';
import ExtraInfoBox from './box/ExtraInfoBox';
import WindCloudBox from './box/WindCloudBox';
import { WeatherDataDisplayProps } from '@/types';

const WeatherDataDisplay: React.FC<WeatherDataDisplayProps> = ({
    weatherData,
    error,
    }) => {
    if (error) {
        return <p className="text-red-600 mt-4 text-center">{error}</p>;
    }

    if (!weatherData) {
        return null; // o un messaggio di caricamento
    }

    const cityName = weatherData.name.replace('Provincia di ', '');
    const italianTime = new Date(weatherData.dt * 1000).toLocaleString('it-IT', {
        timeZone: 'Europe/Rome',
    });

    const localDate = new Date((weatherData.dt + weatherData.timezone) * 1000);
    const timeZoneOffsetHours = weatherData.timezone / 3600;
    const timeZoneName = `Etc/GMT${
        timeZoneOffsetHours > 0 ? '-' : '+'
    }${Math.abs(timeZoneOffsetHours)}`;
    const localTime = localDate.toLocaleString('it-IT', {
        timeZone: timeZoneName,
});

    return (
        <div className="mt-3 w-full flex justify-center">
            <div className="bg-white rounded-lg shadow-xl p-2 w-full max-w-full">
                <h2 className="p-2 text-2xl md:text-3xl font-bold text-indigo-800 text-center">
                    {cityName}
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
                    <div className="text-black text-center">
                        <span className="text-lg md:text-xl"><WiTime3 className="inline-block mr-1" /> {localTime}<br /></span>
                        <span className="text-md ">Orario di: {cityName}<br /></span>
                        <span className="text-sm text-gray-600"><WiTime3 className="inline-block mr-1" /> {italianTime}<br /></span>
                        <span className="text-sm text-gray-700">(Orario Italiano)</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 m-2">
                        <FaMapPin className="text-red-600 text-xl md:text-2xl" />
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center">
                            <span className="text-md md:text-xl text-black w-12">Lon:</span>
                            <span className="text-md md:text-xl text-amber-950 ">{weatherData.coord.lon}</span>
                            </div>
                            <div className="flex items-center">
                            <span className="text-md md:text-xl text-black w-12">Lat:</span>
                            <span className="text-md md:text-xl text-amber-950">{weatherData.coord.lat}</span>
                            </div>
                        </div>
                        </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-8 gap-4 ">
                    <div className="md:col-span-3 xl:col-span-4 ">
                        <MeteoBox weatherData={weatherData} />
                    </div>
                    <div className="grid xl:grid-cols-4 md:col-span-2 xl:col-span-4 gap-2 ">
                        <div className="grid grid-cols-1 md:col-span-2 xl:col-span-3 gap-1">
                            <MainBox weatherData={weatherData} />
                            <WindCloudBox weatherData={weatherData} />
                        </div>
                        <div className="flex flex-col lg:flex-row xl:flex-col gap-1">
                            <SysBox weatherData={weatherData} />
                            <ExtraInfoBox weatherData={weatherData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherDataDisplay;