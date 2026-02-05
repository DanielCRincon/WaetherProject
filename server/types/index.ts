export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    windSpeed: number;
    windDirection: number;
    cloudCover: number;
    dewPoint: number;
  };
  condition: {
    main: string;
    description: string;
    icon: string;
    code: number;
  };
  timestamps: {
    sunrise: number;
    sunset: number;
    observation: number;
  };
}

export interface ForecastData {
  location: WeatherData['location'];
  current: WeatherData['current'];
  condition: WeatherData['condition'];
  forecast: Array<{
    date: string;
    day: {
      maxTemp: number;
      minTemp: number;
      condition: WeatherData['condition'];
      humidity: number;
      windSpeed: number;
      precipitationChance: number;
      precipitationAmount: number;
      uvIndex: number;
    };
    hourly: Array<{
      time: string;
      temperature: number;
      feelsLike: number;
      condition: WeatherData['condition'];
      precipitationChance: number;
      windSpeed: number;
      humidity: number;
      pressure: number;
    }>;
  }>;
}

export interface AirQualityData {
  location: WeatherData['location'];
  aqi: number;
  components: {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
  description: string;
  color: string;
}

export interface WeatherAlert {
  id: string;
  title: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  urgency: 'immediate' | 'expected' | 'future';
  areas: string[];
  certainty: 'observed' | 'likely' | 'possible' | 'unlikely';
  event: string;
  start: number;
  end: number;
  instruction?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    units: 'metric' | 'imperial';
    language: string;
    theme: 'light' | 'dark' | 'auto';
    notifications: {
      email: boolean;
      push: boolean;
      weatherAlerts: boolean;
      dailyForecast: boolean;
    };
  };
  favorites: Array<{
    id: string;
    name: string;
    lat: number;
    lon: number;
    addedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

export interface OpenWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}