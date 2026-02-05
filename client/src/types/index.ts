// Weather data types
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

export interface FavoriteLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  addedAt: Date;
}

export interface UserPreferences {
  units: 'metric' | 'imperial';
  language: 'es' | 'en';
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    weatherAlerts: boolean;
    dailyForecast: boolean;
  };
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

// UI Component Props
export interface WeatherCardProps {
  weather: WeatherData;
  loading?: boolean;
  error?: string;
}

export interface ForecastCardProps {
  forecast: ForecastData['forecast'][0];
  compact?: boolean;
}

export interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export interface ThemeToggleProps {
  theme: 'light' | 'dark' | 'auto';
  onThemeChange: (theme: 'light' | 'dark' | 'auto') => void;
}

export interface LanguageToggleProps {
  language: 'es' | 'en';
  onLanguageChange: (language: 'es' | 'en') => void;
}

// Form Types
export interface SearchFormData {
  city: string;
}

export interface SettingsFormData {
  units: 'metric' | 'imperial';
  language: 'es' | 'en';
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    weatherAlerts: boolean;
    dailyForecast: boolean;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Loading States
export interface LoadingState {
  weather: boolean;
  forecast: boolean;
  airQuality: boolean;
  favorites: boolean;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
}