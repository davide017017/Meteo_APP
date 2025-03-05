// src/types.d.ts

export interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: [{
        description: string;
    }];
    wind: {
        speed: number;
    };
    dt: number;
    timezone: number;
    coord: {
        lon: number;
        lat: number;
    };
}

export interface CityInputProps {
    onFetchWeather: (city: string) => void;
}

export  interface WeatherDataDisplayProps {
    weatherData: WeatherData | null;
    error: string | null;
}

export interface WeatherDetailsBoxProps { 
    weatherData: any;
}

export interface SysBoxProps {
    weatherData: any;
}

export interface MainBoxProps {
    weatherData: any;
    className?: string;
}