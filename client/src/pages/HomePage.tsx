import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeatherStore } from '../stores/weatherStore';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { 
    currentWeather, 
    forecast, 
    airQuality, 
    loading, 
    errors, 
    selectedCity,
    setLoading,
    setError,
    clearAllErrors
  } = useWeatherStore();

  const handleSearch = async (city: string) => {
    try {
      clearAllErrors();
      setLoading('weather', true);
      
      // TODO: Implement API call to get weather data
      // For now, simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      const mockWeather = {
        location: {
          name: city,
          country: 'CO',
          lat: 4.7110,
          lon: -74.0721,
        },
        current: {
          temperature: 22,
          feelsLike: 24,
          humidity: 65,
          pressure: 1013,
          visibility: 10,
          uvIndex: 6,
          windSpeed: 12,
          windDirection: 180,
          cloudCover: 40,
          dewPoint: 16,
        },
        condition: {
          main: 'Clouds',
          description: 'nubes dispersas',
          icon: '02d',
          code: 801,
        },
        timestamps: {
          sunrise: 1698123456,
          sunset: 1698167890,
          observation: 1698145678,
        },
      };
      
      // This would be replaced with actual API call
      // const response = await weatherAPI.getCurrentWeather(city);
      // setCurrentWeather(response.data);
      
    } catch (error) {
      setError('weather', t('error.generic'));
    } finally {
      setLoading('weather', false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t('weather.current')}
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Obtén el pronóstico del tiempo actual para cualquier ciudad del mundo
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <SearchBar onSearch={handleSearch} loading={loading.weather} />
      </motion.div>

      {/* Weather Display */}
      {selectedCity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Current Weather Card */}
          <WeatherCard
            weather={currentWeather}
            loading={loading.weather}
            error={errors.weather}
          />

          {/* Additional Information Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Forecast Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="weather-card"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('weather.forecast')}
              </h3>
              {loading.forecast ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-12 bg-gray-200/20 rounded"></div>
                  <div className="h-12 bg-gray-200/20 rounded"></div>
                  <div className="h-12 bg-gray-200/20 rounded"></div>
                </div>
              ) : (
                <div className="text-white/60">
                  <p>Pronóstico de 7 días</p>
                  <p className="text-sm mt-2">Próximamente disponible</p>
                </div>
              )}
            </motion.div>

            {/* Air Quality Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="weather-card"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {t('weather.air_quality')}
              </h3>
              {loading.airQuality ? (
                <div className="animate-pulse">
                  <div className="h-20 bg-gray-200/20 rounded"></div>
                </div>
              ) : (
                <div className="text-white/60">
                  <p>Índice de Calidad del Aire</p>
                  <p className="text-sm mt-2">Próximamente disponible</p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!selectedCity && !loading.weather && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🌤️</div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Bienvenido a Weather App V2
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            Busca una ciudad para ver el pronóstico del tiempo actual y otras informaciones meteorológicas.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;