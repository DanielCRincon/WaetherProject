import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useWeatherStore } from '../stores/weatherStore';

const SettingsPage: React.FC = () => {
  const { t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { preferences, updatePreferences } = useWeatherStore();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    updatePreferences({ theme: newTheme });
  };

  const handleLanguageChange = (newLanguage: 'es' | 'en') => {
    setLanguage(newLanguage);
    updatePreferences({ language: newLanguage });
  };

  const handleUnitsChange = (units: 'metric' | 'imperial') => {
    updatePreferences({ units });
  };

  const handleNotificationChange = (type: keyof typeof preferences.notifications, value: boolean) => {
    updatePreferences({
      notifications: {
        ...preferences.notifications,
        [type]: value,
      },
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          {t('settings.title')}
        </h1>
        <p className="text-white/80">
          Personaliza tu experiencia con la aplicación
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="weather-card"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Apariencia
          </h2>
          
          <div className="space-y-4">
            {/* Theme */}
            <div>
              <label className="block text-white/80 mb-2">Tema</label>
              <div className="grid grid-cols-3 gap-2">
                {(['light', 'dark', 'auto'] as const).map((themeOption) => (
                  <button
                    key={themeOption}
                    onClick={() => handleThemeChange(themeOption)}
                    className={`p-3 rounded-lg border transition-all ${
                      theme === themeOption
                        ? 'bg-blue-500/20 border-blue-400 text-white'
                        : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">
                        {themeOption === 'light' ? '☀️' : themeOption === 'dark' ? '🌙' : '🔄'}
                      </div>
                      <div className="text-xs capitalize">
                        {themeOption === 'light' ? 'Claro' : themeOption === 'dark' ? 'Oscuro' : 'Auto'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-white/80 mb-2">Idioma</label>
              <div className="grid grid-cols-2 gap-2">
                {(['es', 'en'] as const).map((langOption) => (
                  <button
                    key={langOption}
                    onClick={() => handleLanguageChange(langOption)}
                    className={`p-3 rounded-lg border transition-all ${
                      language === langOption
                        ? 'bg-blue-500/20 border-blue-400 text-white'
                        : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">
                        {langOption === 'es' ? '🇪🇸' : '🇬🇧'}
                      </div>
                      <div className="text-xs">
                        {langOption === 'es' ? 'Español' : 'English'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Units Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="weather-card"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Unidades
          </h2>
          
          <div>
            <label className="block text-white/80 mb-2">Temperatura</label>
            <div className="grid grid-cols-2 gap-2">
              {(['metric', 'imperial'] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => handleUnitsChange(unit)}
                  className={`p-3 rounded-lg border transition-all ${
                    preferences.units === unit
                      ? 'bg-blue-500/20 border-blue-400 text-white'
                      : 'bg-white/10 border-white/20 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">
                      {unit === 'metric' ? '°C' : '°F'}
                    </div>
                    <div className="text-xs">
                      {unit === 'metric' ? 'Métrico' : 'Imperial'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="weather-card"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Notificaciones
          </h2>
          
          <div className="space-y-4">
            {Object.entries(preferences.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium capitalize">
                    {key === 'email' ? 'Correo electrónico' :
                     key === 'push' ? 'Push notifications' :
                     key === 'weatherAlerts' ? 'Alertas climáticas' :
                     key === 'dailyForecast' ? 'Pronóstico diario' : key}
                  </p>
                  <p className="text-white/60 text-sm">
                    {key === 'email' ? 'Recibir notificaciones por correo' :
                     key === 'push' ? 'Notificaciones push en el navegador' :
                     key === 'weatherAlerts' ? 'Alertas de clima extremo' :
                     key === 'dailyForecast' ? 'Resumen diario del clima' : ''}
                  </p>
                </div>
                
                <button
                  onClick={() => handleNotificationChange(key as keyof typeof preferences.notifications, !value)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="weather-card"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Acerca de
          </h2>
          
          <div className="space-y-4 text-white/60">
            <div>
              <h3 className="text-white font-medium mb-1">Weather App V2</h3>
              <p className="text-sm">Versión 2.0.0</p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-1">Datos</h3>
              <p className="text-sm">Clima proporcionado por OpenWeather API</p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-1">Desarrollado por</h3>
              <p className="text-sm">Daniel Cabrera Rincon</p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-1">Tecnologías</h3>
              <p className="text-sm">React, Node.js, TypeScript, Tailwind CSS</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;