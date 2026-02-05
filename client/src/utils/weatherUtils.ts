import { WeatherData, ForecastData, AirQualityData } from '../types';

// Utility functions for weather data formatting
export const weatherUtils = {
  // Format temperature based on units
  formatTemperature: (temp: number, units: 'metric' | 'imperial'): string => {
    if (units === 'imperial') {
      // Convert Celsius to Fahrenheit
      const fahrenheit = (temp * 9/5) + 32;
      return `${Math.round(fahrenheit)}°F`;
    }
    return `${Math.round(temp)}°C`;
  },

  // Format wind speed based on units
  formatWindSpeed: (speed: number, units: 'metric' | 'imperial'): string => {
    if (units === 'imperial') {
      // Convert km/h to mph
      const mph = speed * 0.621371;
      return `${Math.round(mph)} mph`;
    }
    return `${Math.round(speed)} km/h`;
  },

  // Format pressure
  formatPressure: (pressure: number): string => {
    return `${Math.round(pressure)} hPa`;
  },

  // Format visibility
  formatVisibility: (visibility: number, units: 'metric' | 'imperial'): string => {
    if (units === 'imperial') {
      // Convert km to miles
      const miles = visibility * 0.621371;
      return `${Math.round(miles)} miles`;
    }
    return `${Math.round(visibility)} km`;
  },

  // Format time
  formatTime: (timestamp: number, options?: Intl.DateTimeFormatOptions): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    });
  },

  // Format date
  formatDate: (timestamp: number, options?: Intl.DateTimeFormatOptions): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    });
  },

  // Get weather icon URL
  getWeatherIconUrl: (iconCode: string): string => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  },

  // Get weather description with proper capitalization
  formatWeatherDescription: (description: string): string => {
    return description
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  // Get wind direction from degrees
  getWindDirection: (degrees: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  },

  // Get UV index description
  getUVIndexDescription: (uvIndex: number): { level: string; color: string; advice: string } => {
    if (uvIndex <= 2) {
      return {
        level: 'Bajo',
        color: '#00E400',
        advice: 'No se requiere protección solar'
      };
    } else if (uvIndex <= 5) {
      return {
        level: 'Moderado',
        color: '#FFFF00',
        advice: 'Se recomienda protección solar'
      };
    } else if (uvIndex <= 7) {
      return {
        level: 'Alto',
        color: '#FF7E00',
        advice: 'Se requiere protección solar'
      };
    } else if (uvIndex <= 10) {
      return {
        level: 'Muy Alto',
        color: '#FF0000',
        advice: 'Se requiere protección solar adicional'
      };
    } else {
      return {
        level: 'Extremo',
        color: '#8F3F97',
        advice: 'Evitar la exposición al sol'
      };
    }
  },

  // Get air quality description
  getAirQualityDescription: (aqi: number): { level: string; color: string; advice: string } => {
    if (aqi <= 50) {
      return {
        level: 'Bueno',
        color: '#00E400',
        advice: 'Calidad del aire satisfactoria'
      };
    } else if (aqi <= 100) {
      return {
        level: 'Moderado',
        color: '#FFFF00',
        advice: 'Calidad del aire aceptable'
      };
    } else if (aqi <= 150) {
      return {
        level: 'Insalubre para grupos sensibles',
        color: '#FF7E00',
        advice: 'Los grupos sensibles deben limitar la exposición'
      };
    } else if (aqi <= 200) {
      return {
        level: 'Insalubre',
        color: '#FF0000',
        advice: 'Todos deben limitar la exposición'
      };
    } else if (aqi <= 300) {
      return {
        level: 'Muy Insalubre',
        color: '#8F3F97',
        advice: 'Evitar actividades al aire libre'
      };
    } else {
      return {
        level: 'Peligroso',
        color: '#7E0023',
        advice: 'Permanecer en interiores'
      };
    }
  },

  // Calculate feels like temperature
  calculateFeelsLike: (temp: number, humidity: number, windSpeed: number): number => {
    // Simplified feels like calculation
    const windChill = temp - (windSpeed * 0.7);
    const humidityFactor = humidity > 60 ? (humidity - 60) * 0.1 : 0;
    return Math.round(windChill - humidityFactor);
  },

  // Determine if it's day or night
  isDaytime: (sunrise: number, sunset: number, current: number): boolean => {
    return current >= sunrise && current <= sunset;
  },

  // Get weather emoji for quick display
  getWeatherEmoji: (iconCode: string): string => {
    const emojiMap: { [key: string]: string } = {
      '01d': '☀️',
      '01n': '🌙',
      '02d': '⛅',
      '02n': '☁️',
      '03d': '☁️',
      '03n': '☁️',
      '04d': '☁️',
      '04n': '☁️',
      '09d': '🌧️',
      '09n': '🌧️',
      '10d': '🌧️',
      '10n': '🌧️',
      '11d': '⛈️',
      '11n': '⛈️',
      '13d': '❄️',
      '13n': '❄️',
      '50d': '🌫️',
      '50n': '🌫️',
    };
    return emojiMap[iconCode] || '🌤️';
  },

  // Get background gradient based on weather
  getWeatherGradient: (iconCode: string, isDaytime: boolean): string => {
    if (isDaytime) {
      const dayGradients: { [key: string]: string } = {
        '01d': 'from-yellow-400 to-orange-500',
        '02d': 'from-gray-400 to-gray-600',
        '03d': 'from-gray-500 to-gray-700',
        '04d': 'from-gray-600 to-gray-800',
        '09d': 'from-blue-600 to-blue-800',
        '10d': 'from-blue-700 to-blue-900',
        '11d': 'from-gray-700 to-gray-900',
        '13d': 'from-gray-300 to-gray-500',
        '50d': 'from-gray-600 to-gray-800',
      };
      return dayGradients[iconCode] || 'from-blue-600 to-blue-800';
    } else {
      const nightGradients: { [key: string]: string } = {
        '01n': 'from-indigo-900 to-purple-900',
        '02n': 'from-gray-800 to-gray-900',
        '03n': 'from-gray-800 to-gray-900',
        '04n': 'from-gray-800 to-gray-900',
        '09n': 'from-blue-900 to-indigo-900',
        '10n': 'from-blue-900 to-indigo-900',
        '11n': 'from-gray-900 to-black',
        '13n': 'from-gray-700 to-gray-900',
        '50n': 'from-gray-800 to-gray-900',
      };
      return nightGradients[iconCode] || 'from-indigo-900 to-purple-900';
    }
  },

  // Validate coordinates
  validateCoordinates: (lat: number, lon: number): boolean => {
    return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
  },

  // Generate location key for caching
  generateLocationKey: (name: string, lat: number, lon: number): string => {
    return `${name.toLowerCase().replace(/\s+/g, '_')}_${lat.toFixed(4)}_${lon.toFixed(4)}`;
  },

  // Parse location from key
  parseLocationKey: (key: string): { name: string; lat: number; lon: number } | null => {
    const parts = key.split('_');
    if (parts.length !== 3) return null;
    
    const name = parts[0].replace(/_/g, ' ');
    const lat = parseFloat(parts[1]);
    const lon = parseFloat(parts[2]);
    
    if (isNaN(lat) || isNaN(lon)) return null;
    
    return { name, lat, lon };
  },
};

export default weatherUtils;