import { Router } from 'express';
import { weatherController } from '@/controllers/weatherController';
import { validateRequest } from '@/middleware/validation';
import { weatherSchemas } from '@/utils/validationSchemas';

const router = Router();

// Get current weather by city name
router.get('/current/:city', weatherController.getCurrentWeather);

// Get forecast by city name
router.get('/forecast/:city', weatherController.getForecast);

// Get complete weather data (current + forecast + air quality)
router.get('/complete/:city', weatherController.getCompleteWeather);

// Get weather by coordinates
router.get('/coordinates', weatherController.getWeatherByCoordinates);

// Get air quality by coordinates
router.get('/air-quality', weatherController.getAirQuality);

// Search cities
router.get('/search', weatherController.searchCities);

export default router;