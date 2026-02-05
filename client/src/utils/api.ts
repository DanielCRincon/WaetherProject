import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add request ID
apiClient.interceptors.request.use(
  (config) => {
    config.headers['x-request-id'] = generateRequestId();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error('Unauthorized access');
    } else if (error.response?.status === 429) {
      // Handle rate limiting
      console.error('Rate limit exceeded');
    }
    
    return Promise.reject(error);
  }
);

// Helper function to generate unique request IDs
function generateRequestId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Weather API endpoints
export const weatherAPI = {
  // Get current weather by city name
  getCurrentWeather: (city: string, units: 'metric' | 'imperial' = 'metric') =>
    apiClient.get(`/weather/current/${city}`, {
      params: { units },
    }),

  // Get forecast by city name
  getForecast: (city: string, units: 'metric' | 'imperial' = 'metric') =>
    apiClient.get(`/weather/forecast/${city}`, {
      params: { units },
    }),

  // Get complete weather data (current + forecast + air quality)
  getCompleteWeather: (city: string, units: 'metric' | 'imperial' = 'metric') =>
    apiClient.get(`/weather/complete/${city}`, {
      params: { units },
    }),

  // Get weather by coordinates
  getWeatherByCoordinates: (
    lat: number,
    lon: number,
    units: 'metric' | 'imperial' = 'metric'
  ) =>
    apiClient.get('/weather/coordinates', {
      params: { lat, lon, units },
    }),

  // Get air quality by coordinates
  getAirQuality: (lat: number, lon: number) =>
    apiClient.get('/weather/air-quality', {
      params: { lat, lon },
    }),

  // Search cities
  searchCities: (query: string, limit: number = 5) =>
    apiClient.get('/weather/search', {
      params: { q: query, limit },
    }),
};

// User API endpoints
export const userAPI = {
  // Register new user
  register: (userData: {
    email: string;
    password: string;
    name: string;
    preferences?: any;
  }) =>
    apiClient.post('/users/register', userData),

  // Login user
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/users/login', credentials),

  // Refresh token
  refreshToken: (refreshToken: string) =>
    apiClient.post('/users/refresh', { refreshToken }),

  // Get user profile
  getProfile: () =>
    apiClient.get('/users/profile'),

  // Update profile
  updateProfile: (profileData: any) =>
    apiClient.put('/users/profile', profileData),

  // Update preferences
  updatePreferences: (preferences: any) =>
    apiClient.put('/users/preferences', preferences),

  // Get favorites
  getFavorites: () =>
    apiClient.get('/users/favorites'),

  // Add favorite location
  addFavorite: (favoriteData: {
    name: string;
    lat: number;
    lon: number;
  }) =>
    apiClient.post('/users/favorites', favoriteData),

  // Remove favorite location
  removeFavorite: (id: string) =>
    apiClient.delete(`/users/favorites/${id}`),

  // Logout
  logout: () =>
    apiClient.post('/users/logout'),
};

// Generic API wrapper for error handling
export const api = {
  get: apiClient.get,
  post: apiClient.post,
  put: apiClient.put,
  delete: apiClient.delete,
  patch: apiClient.patch,
};

export default apiClient;