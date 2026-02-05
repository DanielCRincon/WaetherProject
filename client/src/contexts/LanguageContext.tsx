import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPreferences } from '../types';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.favorites': 'Favoritos',
    'nav.settings': 'Configuración',
    
    // Weather
    'weather.current': 'Clima Actual',
    'weather.forecast': 'Pronóstico',
    'weather.air_quality': 'Calidad del Aire',
    'weather.temperature': 'Temperatura',
    'weather.feels_like': 'Sensación Térmica',
    'weather.humidity': 'Humedad',
    'weather.pressure': 'Presión',
    'weather.wind': 'Viento',
    'weather.visibility': 'Visibilidad',
    'weather.uv_index': 'Índice UV',
    'weather.sunrise': 'Amanecer',
    'weather.sunset': 'Atardecer',
    
    // Search
    'search.placeholder': 'Buscar ciudad...',
    'search.no_results': 'No se encontraron resultados',
    'search.loading': 'Buscando...',
    
    // Favorites
    'favorites.add': 'Agregar a favoritos',
    'favorites.remove': 'Eliminar de favoritos',
    'favorites.empty': 'No tienes ciudades favoritas',
    
    // Units
    'units.celsius': '°C',
    'units.fahrenheit': '°F',
    'units.kmh': 'km/h',
    'units.mph': 'mph',
    'units.hpa': 'hPa',
    'units.inhg': 'inHg',
    'units.km': 'km',
    'units.miles': 'millas',
    
    // Air Quality
    'aqi.good': 'Buena',
    'aqi.moderate': 'Moderada',
    'aqi.unhealthy_sensitive': 'Insalubre para grupos sensibles',
    'aqi.unhealthy': 'Insalubre',
    'aqi.very_unhealthy': 'Muy insalubre',
    'aqi.hazardous': 'Peligrosa',
    
    // Errors
    'error.network': 'Error de conexión',
    'error.not_found': 'Ciudad no encontrada',
    'error.server': 'Error del servidor',
    'error.generic': 'Ocurrió un error inesperado',
    
    // Loading
    'loading.weather': 'Cargando clima...',
    'loading.forecast': 'Cargando pronóstico...',
    'loading.air_quality': 'Cargando calidad del aire...',
    
    // Actions
    'action.refresh': 'Actualizar',
    'action.search': 'Buscar',
    'action.save': 'Guardar',
    'action.cancel': 'Cancelar',
    'action.confirm': 'Confirmar',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.favorites': 'Favorites',
    'nav.settings': 'Settings',
    
    // Weather
    'weather.current': 'Current Weather',
    'weather.forecast': 'Forecast',
    'weather.air_quality': 'Air Quality',
    'weather.temperature': 'Temperature',
    'weather.feels_like': 'Feels Like',
    'weather.humidity': 'Humidity',
    'weather.pressure': 'Pressure',
    'weather.wind': 'Wind',
    'weather.visibility': 'Visibility',
    'weather.uv_index': 'UV Index',
    'weather.sunrise': 'Sunrise',
    'weather.sunset': 'Sunset',
    
    // Search
    'search.placeholder': 'Search city...',
    'search.no_results': 'No results found',
    'search.loading': 'Searching...',
    
    // Favorites
    'favorites.add': 'Add to favorites',
    'favorites.remove': 'Remove from favorites',
    'favorites.empty': 'You have no favorite cities',
    
    // Units
    'units.celsius': '°C',
    'units.fahrenheit': '°F',
    'units.kmh': 'km/h',
    'units.mph': 'mph',
    'units.hpa': 'hPa',
    'units.inhg': 'inHg',
    'units.km': 'km',
    'units.miles': 'miles',
    
    // Air Quality
    'aqi.good': 'Good',
    'aqi.moderate': 'Moderate',
    'aqi.unhealthy_sensitive': 'Unhealthy for Sensitive Groups',
    'aqi.unhealthy': 'Unhealthy',
    'aqi.very_unhealthy': 'Very Unhealthy',
    'aqi.hazardous': 'Hazardous',
    
    // Errors
    'error.network': 'Network error',
    'error.not_found': 'City not found',
    'error.server': 'Server error',
    'error.generic': 'An unexpected error occurred',
    
    // Loading
    'loading.weather': 'Loading weather...',
    'loading.forecast': 'Loading forecast...',
    'loading.air_quality': 'Loading air quality...',
    
    // Actions
    'action.refresh': 'Refresh',
    'action.search': 'Search',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.confirm': 'Confirm',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'es';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};