import React from 'react';
import { WiTime3, WiSunrise, WiSunset } from 'react-icons/wi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { SysBoxProps } from '@/types';

const SysBox: React.FC<SysBoxProps> = ({ weatherData }) => {
    const { country, sunrise, sunset, type, id } = weatherData.sys || {};
    const countryName = country;

    return (
        <div className="p-2 pt-1 pb-1 rounded-md border shadow-md shadow-black border-gray-200 grid grid-cols-2 gap-2 justify-items-center">
            <div className="col-span-2 grid grid-cols-2 grid-rows-4 gap-1 place-items-center">
                <div className="grid">
                    <WiSunrise className="text-5xl text-orange-400" />
                </div>
                <div>
                    <span className="text-black whitespace-nowrap">Alba:</span>
                </div>
                <div className="grid col-span-2 text-2xl">
                    <span>{new Date(sunrise * 1000).toLocaleTimeString()}</span>
                </div>
                <div>
                    <WiSunset className="text-5xl text-orange-700" />
                </div>
                <div>
                    <span className="text-black xl:text-xs whitespace-nowrap">Tramonto:</span>
                </div>
                <div className="grid col-span-2 text-2xl">
                    {new Date(sunset * 1000).toLocaleTimeString()}
                </div>
            </div>
            <div className="flex flex-col items-center">
                <FaMapMarkerAlt className="text-2xl text-rose-950" />
                <span className="text-lg text-black whitespace-nowrap">{countryName}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">(Paese)</span>
            </div>
            <div className="flex flex-col items-center">
                <WiTime3 className="text-2xl text-yellow-600" />
                <span className="text-xs text-gray-500 whitespace-nowrap">Sistema</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">(Dati interni)</span>
            </div>
            <div className="col-span-2 flex flex-col items-center">
                <span className="text-xs text-gray-600 whitespace-nowrap">Tipo: {type}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">(Sistema interno)</span>
            </div>
            <div className="col-span-2 flex flex-col items-center">
                <span className="text-xs text-gray-600 whitespace-nowrap">ID: {id}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">(Identificatore città)</span>
            </div>
        </div>
    );
};

export default SysBox;