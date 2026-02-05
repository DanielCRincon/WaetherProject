import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeatherStore } from '../stores/weatherStore';

interface WeatherCardProps {
  weather: WeatherData;
  loading?: boolean;
  error?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  weather, 
  loading = false, 
  error 
}) => {
  const { t } = useLanguage();
  const { preferences, addFavorite, removeFavorite, favorites } = useWeatherStore();

  if (loading) {
    return (
      <div className="weather-card">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200/20 rounded mb-4"></div>
          <div className="h-16 bg-gray-200/20 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-gray-200/20 rounded"></div>
            <div className="h-12 bg-gray-200/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card">
        <div className="text-center text-white">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-lg font-semibold mb-2">Error</p>
          <p className="text-white/60">{error}</p>
        </div>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  const isFavorite = favorites.some(
    (fav) => fav.name === weather.location.name && 
           fav.lat === weather.location.lat && 
           fav.lon === weather.location.lon
  );

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      // Find and remove the favorite
      const favorite = favorites.find(
        (fav) => fav.name === weather.location.name && 
               fav.lat === weather.location.lat && 
               fav.lon === weather.location.lon
      );
      if (favorite) {
        removeFavorite(favorite.id);
      }
    } else {
      addFavorite({
        id: Date.now().toString(),
        name: weather.location.name,
        lat: weather.location.lat,
        lon: weather.location.lon,
        addedAt: new Date(),
      });
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
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
    return iconMap[iconCode] || '🌤️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="weather-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            {weather.location.name}
          </h2>
          <p className="text-white/60 text-sm">
            {weather.location.country}
          </p>
        </div>
        
        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFavoriteToggle}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
          <span className="text-xl">
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </motion.button>
      </div>

      {/* Current Weather */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">
          {getWeatherIcon(weather.condition.icon)}
        </div>
        <div className="text-4xl font-bold text-white mb-2">
          {Math.round(weather.current.temperature)}°{preferences.units === 'metric' ? 'C' : 'F'}
        </div>
        <p className="text-white/80 capitalize">
          {weather.condition.description}
        </p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-white/60 mb-1">{t('weather.feels_like')}</p>
          <p className="text-white font-semibold">
            {Math.round(weather.current.feelsLike)}°
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-white/60 mb-1">{t('weather.humidity')}</p>
          <p className="text-white font-semibold">
            {weather.current.humidity}%
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-white/60 mb-1">{t('weather.wind')}</p>
          <p className="text-white font-semibold">
            {weather.current.windSpeed} {preferences.units === 'metric' ? 'km/h' : 'mph'}
          </p>
          <p className="text-white/60 text-xs">
            {getWindDirection(weather.current.windDirection)}
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-white/60 mb-1">{t('weather.pressure')}</p>
          <p className="text-white font-semibold">
            {weather.current.pressure} hPa
          </p>
        </div>
      </div>

      {/* Sun Times */}
      <div className="flex justify-between mt-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">{t('weather.sunrise')}</p>
          <p className="text-white font-semibold">
            {formatTime(weather.timestamps.sunrise)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-white/60 text-xs mb-1">{t('weather.sunset')}</p>
          <p className="text-white font-semibold">
            {formatTime(weather.timestamps.sunset)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;