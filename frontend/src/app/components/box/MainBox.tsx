import React from 'react';
import { WiThermometer, WiHumidity } from 'react-icons/wi';
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureHalf } from "react-icons/fa6";
import { TbTemperatureCelsius } from "react-icons/tb";
import { LiaCompressArrowsAltSolid } from "react-icons/lia";
import { MdOutlineCompress } from "react-icons/md";
import { MainBoxProps } from '@/types';
import { FaArrowUpFromGroundWater } from "react-icons/fa6";

const getTempColor = (temp: number | undefined): string => {
    if (temp === undefined) return 'text-gray-400';
    if (temp <= 0) return 'text-blue-800';
    if (temp <= 10) return 'text-blue-400';
    if (temp <= 20) return 'text-green-600';
    if (temp <= 30) return 'text-orange-500';
    return 'text-red-600';
};

const PRESSURE_HIGH = 1025; // Pressione alta (hPa)
const PRESSURE_LOW = 1000; // Pressione bassa (hPa)
const HUMIDITY_HIGH = 80; // Umidità alta (%)
const HUMIDITY_LOW = 40; // Umidità bassa (%)
const SEA_LEVEL_HIGH = 1025; // Soglia di pressione alta al livello del mare (hPa)
const SEA_LEVEL_LOW = 1000; // Soglia di pressione bassa al livello del mare (hPa)
const GROUND_LEVEL_HIGH = 1025; // Soglia di pressione alta al livello del suolo (hPa)
const GROUND_LEVEL_LOW = 1000; // Soglia di pressione bassa al livello del suolo (hPa)

const getColorByValue = (value: number | undefined, high: number, low: number): string => {
    if (value === undefined) return 'text-gray-400';
    if (value > high) return 'text-red-700'; // Valore alto
    if (value < low) return 'text-blue-700'; // Valore basso
    return 'text-green-700'; // Valore normale
};

const weatherParams = [
    {
        label: 'Temp',
        valueGetter: (data: any) => data.main?.temp,
        colorGetter: getTempColor,
        icon: WiThermometer,
        textSize: 'text-xl',
    },
    {
        label: 'Feels Like',
        valueGetter: (data: any) => data.main?.feels_like,
        colorGetter: getTempColor,
        icon: FaTemperatureHalf,
        textSize: 'text-lg',
    },
    {
        label: 'Min',
        valueGetter: (data: any) => data.main?.temp_min,
        colorGetter: getTempColor,
        icon: FaTemperatureArrowDown,
        textSize: 'text-lg',
    },
    {
        label: 'Max',
        valueGetter: (data: any) => data.main?.temp_max,
        colorGetter: getTempColor,
        icon: FaTemperatureArrowUp,
        textSize: 'text-base',
    },
    {
        label: 'Humidity',
        valueGetter: (data: any) => data.main?.humidity,
        colorGetter: (value: number | undefined) => getColorByValue(value, HUMIDITY_HIGH, HUMIDITY_LOW),
        icon: WiHumidity,
        textSize: 'text-lg',
        unit: '%',
    },
    {
        label: 'Pressure',
        valueGetter: (data: any) => data.main?.pressure,
        colorGetter: (value: number | undefined) => getColorByValue(value, PRESSURE_HIGH, PRESSURE_LOW),
        icon: LiaCompressArrowsAltSolid,
        textSize: 'text-base',
        unit: ' hPa',
        description: 'Pressione atmosferica (hPa)',
    },
    {
        label: 'Sea Level',
        valueGetter: (data: any) => data.main?.sea_level,
        colorGetter: (value: number | undefined) => getColorByValue(value, SEA_LEVEL_HIGH, SEA_LEVEL_LOW),
        icon: FaArrowUpFromGroundWater,
        textSize: 'text-base',
        unit: ' hPa',
        description: 'Pressione al livello del mare (hPa)',
    },
    {
        label: 'Ground Level',
        valueGetter: (data: any) => data.main?.grnd_level,
        colorGetter: (value: number | undefined) => getColorByValue(value, GROUND_LEVEL_HIGH, GROUND_LEVEL_LOW),
        icon: MdOutlineCompress,
        textSize: 'text-base',
        unit: ' hPa',
        description: 'Pressione al livello del suolo (hPa)',
    },
];

const MainBox: React.FC<MainBoxProps> = ({ weatherData }) => {
    return (
        <div className="h-fit p-2 rounded-lg shadow-md shadow-black border border-gray-200 max-w-full">
            <p className="text-base font-semibold text-black mb-3 text-center">Condizioni Principali</p>
            <div className="h-fit grid grid-cols-2 gap-1 overflow-x-auto">
                {weatherParams.map((param) => (
                    <div key={param.label} className="flex flex-col items-start">
                        <div className="flex flex-wrap items-center">
                            <span className="p-1">
                                <param.icon
                                className={`text-3xl ${param.colorGetter(
                                    param.valueGetter(weatherData)
                                )}`}
                                />
                            </span>
                            <p className="text-sm text-gray-700">{param.label}:</p>
                            <p
                                className={`text-sm ml-1 ${param.colorGetter(
                                param.valueGetter(weatherData)
                                )}`}
                            >
                                {param.valueGetter(weatherData)}
                                {param.label !== "Humidity" &&
                                    param.label !== "Sea Level" &&
                                    param.label !== "Ground Level" &&
                                    param.label !== "Pressure" && (
                                        <TbTemperatureCelsius className="inline-block ml-1 text-lg" />
                                    )}
                                {param.unit}
                            </p>
                        </div>
                        {param.description && (
                            <p className="text-xs text-center text-gray-500">
                                {param.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default MainBox;