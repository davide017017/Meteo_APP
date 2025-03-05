// components/box/ExtraInfoBox.tsx

import React from 'react';
import { AiOutlineCode } from 'react-icons/ai';

interface ExtraInfoBoxProps {
    weatherData: any;
}

const ExtraInfoBox: React.FC<ExtraInfoBoxProps> = ({ weatherData }) => {
    return (
        <div className="p-2 pt-1 pb-1 rounded-md border border-gray-200 grid grid-cols-2 gap-2 justify-items-center">
            <div className="col-span-2 flex items-center justify-center">
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">Dettagli <AiOutlineCode className="inline-block ml-1 text-lg" /></p>
            </div>

            <div className="flex flex-col items-center col-span-2">
                <span className="text-xs text-gray-600 whitespace-nowrap">Codice: {weatherData.cod}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">(Stato richiesta)</span>
            </div>

            <div className="flex flex-col items-center col-span-2">
                <span className="text-xs text-gray-600 whitespace-nowrap">ID: {weatherData.id}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">(ID città)</span>
            </div>

            <div className="flex flex-col items-center col-span-2">
                <span className="text-xs text-gray-600 whitespace-nowrap">Fuso: {weatherData.timezone}s</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">(Fuso orario)</span>
            </div>

            <div className="flex flex-col items-center col-span-2">
                <span className="text-xs text-gray-600 whitespace-nowrap">Base: {weatherData.base}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap">(Dati base)</span>
            </div>
        </div>
    );
};

export default ExtraInfoBox;