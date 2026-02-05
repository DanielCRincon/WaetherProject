import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherData, ForecastData, AirQualityData, FavoriteLocation, UserPreferences } from '../types';

interface WeatherState {
  // Current weather data
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  airQuality: AirQualityData | null;
  
  // Loading states
  loading: {
    weather: boolean;
    forecast: boolean;
    airQuality: boolean;
    search: boolean;
  };
  
  // Error states
  errors: {
    weather: string | null;
    forecast: string | null;
    airQuality: string | null;
    search: string | null;
  };
  
  // User data
  favorites: FavoriteLocation[];
  preferences: UserPreferences;
  
  // UI state
  selectedCity: string;
  searchQuery: string;
  searchResults: Array<{name: string; country: string; lat: number; lon: number}>;
  
  // Actions
  setCurrentWeather: (weather: WeatherData) => void;
  setForecast: (forecast: ForecastData) => void;
  setAirQuality: (airQuality: AirQualityData) => void;
  setLoading: (key: keyof typeof loading, value: boolean) => void;
  setError: (key: keyof typeof errors, error: string | null) => void;
  clearAllErrors: () => void;
  addFavorite: (location: FavoriteLocation) => void;
  removeFavorite: (id: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setSelectedCity: (city: string) => void;
  setSearchQuery: (query: string) => void;
  setSearchResults: (results: any[]) => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentWeather: null,
      forecast: null,
      airQuality: null,
      
      loading: {
        weather: false,
        forecast: false,
        airQuality: false,
        search: false,
      },
      
      errors: {
        weather: null,
        forecast: null,
        airQuality: null,
        search: null,
      },
      
      favorites: [],
      preferences: {
        units: 'metric',
        language: 'es',
        theme: 'auto',
        notifications: {
          email: true,
          push: true,
          weatherAlerts: true,
          dailyForecast: false,
        },
      },
      
      selectedCity: '',
      searchQuery: '',
      searchResults: [],
      
      // Actions
      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      
      setForecast: (forecast) => set({ forecast }),
      
      setAirQuality: (airQuality) => set({ airQuality }),
      
      setLoading: (key, value) => 
        set((state) => ({
          loading: { ...state.loading, [key]: value }
        })),
      
      setError: (key, error) => 
        set((state) => ({
          errors: { ...state.errors, [key]: error }
        })),
      
      clearAllErrors: () => 
        set({
          errors: {
            weather: null,
            forecast: null,
            airQuality: null,
            search: null,
          }
        }),
      
      addFavorite: (location) => 
        set((state) => {
          const exists = state.favorites.some(
            (fav) => fav.name === location.name && 
                   fav.lat === location.lat && 
                   fav.lon === location.lon
          );
          
          if (!exists) {
            return {
              favorites: [...state.favorites, { ...location, id: Date.now().toString() }]
            };
          }
          
          return state;
        }),
      
      removeFavorite: (id) => 
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id)
        })),
      
      updatePreferences: (newPreferences) => 
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        })),
      
      setSelectedCity: (city) => set({ selectedCity: city }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setSearchResults: (results) => set({ searchResults: results }),
    }),
    {
      name: 'weather-store',
      partialize: (state) => ({
        favorites: state.favorites,
        preferences: state.preferences,
      }),
    }
  )
);