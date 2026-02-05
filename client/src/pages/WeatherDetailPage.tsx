import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeatherStore } from '../stores/weatherStore';

const WeatherDetailPage: React.FC = () => {
  const { t } = useLanguage();
  const { favorites } = useWeatherStore();

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Detalles del Clima
        </h1>
        <p className="text-white/80">
          Información detallada del clima y pronóstico extendido
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="weather-card"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">
          Próximamente disponible
        </h2>
        <p className="text-white/60">
          Esta página mostrará detalles completos del clima incluyendo:
        </p>
        <ul className="text-white/60 mt-4 space-y-2">
          <li>• Pronóstico extendido de 7 días</li>
          <li>• Información horaria detallada</li>
          <li>• Mapas meteorológicos interactivos</li>
          <li>• Datos históricos del clima</li>
          <li>• Alertas meteorológicas personalizadas</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default WeatherDetailPage;