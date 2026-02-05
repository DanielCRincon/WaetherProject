import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeatherStore } from '../stores/weatherStore';

const FavoritesPage: React.FC = () => {
  const { t } = useLanguage();
  const { favorites, removeFavorite, setCurrentWeather } = useWeatherStore();

  const handleFavoriteClick = async (favorite: any) => {
    try {
      // TODO: Implement API call to get weather for favorite location
      setCurrentWeather({
        location: {
          name: favorite.name,
          country: 'CO',
          lat: favorite.lat,
          lon: favorite.lon,
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
      });
    } catch (error) {
      console.error('Error loading favorite weather:', error);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          {t('favorites.title')}
        </h1>
        <p className="text-white/80">
          Gestiona tus ciudades favoritas para acceso rápido
        </p>
      </motion.div>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="weather-card text-center py-12"
        >
          <div className="text-6xl mb-4">📍</div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            {t('favorites.empty')}
          </h2>
          <p className="text-white/60">
            Agrega ciudades a tus favoritos para verlas aquí rápidamente
          </p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="weather-card cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleFavoriteClick(favorite)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {favorite.name}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {favorite.lat.toFixed(4)}, {favorite.lon.toFixed(4)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(favorite.id);
                  }}
                  className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors"
                  title={t('favorites.remove')}
                >
                  <span className="text-red-400">✕</span>
                </button>
              </div>
              
              <div className="text-white/60 text-sm">
                <p>Agregado: {new Date(favorite.addedAt).toLocaleDateString('es-CO')}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-white/40 text-xs">
                  Click para ver el clima actual
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;