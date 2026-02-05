import { Request, Response, NextFunction } from 'express';
import { WeatherService } from '@/services/weatherService';
import { APIResponse } from '@/types';
import { logger } from '@/utils/logger';

const weatherService = new WeatherService();

export class WeatherController {
  async getCurrentWeather(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const { units = 'metric' } = req.query;

      if (!city) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_CITY',
            message: 'El nombre de la ciudad es requerido'
          }
        } as APIResponse);
        return;
      }

      const weatherData = await weatherService.getCurrentWeather(city, units as 'metric' | 'imperial');

      res.status(200).json({
        success: true,
        data: weatherData,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string || 'unknown',
          version: '2.0.0'
        }
      } as APIResponse);
    } catch (error) {
      logger.error('Error in getCurrentWeather controller:', error);
      next(error);
    }
  }

  async getForecast(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const { units = 'metric' } = req.query;

      if (!city) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_CITY',
            message: 'El nombre de la ciudad es requerido'
          }
        } as APIResponse);
        return;
      }

      const forecastData = await weatherService.getForecast(city, units as 'metric' | 'imperial');

      res.status(200).json({
        success: true,
        data: forecastData,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string || 'unknown',
          version: '2.0.0'
        }
      } as APIResponse);
    } catch (error) {
      logger.error('Error in getForecast controller:', error);
      next(error);
    }
  }

  async getWeatherByCoordinates(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { lat, lon } = req.query;
      const { units = 'metric' } = req.query;

      if (!lat || !lon) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_COORDINATES',
            message: 'Latitud y longitud son requeridas'
          }
        } as APIResponse);
        return;
      }

      const weatherData = await weatherService.getWeatherByCoordinates(
        parseFloat(lat as string),
        parseFloat(lon as string),
        units as 'metric' | 'imperial'
      );

      res.status(200).json({
        success: true,
        data: weatherData,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string || 'unknown',
          version: '2.0.0'
        }
      } as APIResponse);
    } catch (error) {
      logger.error('Error in getWeatherByCoordinates controller:', error);
      next(error);
    }
  }

  async getAirQuality(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_COORDINATES',
            message: 'Latitud y longitud son requeridas'
          }
        } as APIResponse);
        return;
      }

      const airQualityData = await weatherService.getAirQuality(
        parseFloat(lat as string),
        parseFloat(lon as string)
      );

      res.status(200).json({
        success: true,
        data: airQualityData,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string || 'unknown',
          version: '2.0.0'
        }
      } as APIResponse);
    } catch (error) {
      logger.error('Error in getAirQuality controller:', error);
      next(error);
    }
  }

  async searchCities(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q: query } = req.query;
      const { limit = 5 } = req.query;

      if (!query) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_QUERY',
            message: 'La consulta de búsqueda es requerida'
          }
        } as APIResponse);
        return;
      }

      const cities = await weatherService.searchCities(
        query as string,
        parseInt(limit as string)
      );

      res.status(200).json({
        success: true,
        data: cities,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string || 'unknown',
          version: '2.0.0'
        }
      } as APIResponse);
    } catch (error) {
      logger.error('Error in searchCities controller:', error);
      next(error);
    }
  }

  async getCompleteWeather(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { city } = req.params;
      const { units = 'metric' } = req.query;

      if (!city) {
        res.status(400).json({
          success: false,
          error: {
            code: 'MISSING_CITY',
            message: 'El nombre de la ciudad es requerido'
          }
        } as APIResponse);
        return;
      }

      // Get all weather data in parallel
      const [currentWeather, forecast] = await Promise.all([
        weatherService.getCurrentWeather(city, units as 'metric' | 'imperial'),
        weatherService.getForecast(city, units as 'metric' | 'imperial')
      ]);

      // Get air quality using coordinates
      const airQuality = await weatherService.getAirQuality(
        currentWeather.location.lat,
        currentWeather.location.lon
      );

      const completeData = {
        current: currentWeather,
        forecast,
        airQuality
      };

      res.status(200).json({
        success: true,
        data: completeData,
        meta: {
          timestamp: new Date().toISOString(),
          requestId: req.headers['x-request-id'] as string || 'unknown',
          version: '2.0.0'
        }
      } as APIResponse);
    } catch (error) {
      logger.error('Error in getCompleteWeather controller:', error);
      next(error);
    }
  }
}

export const weatherController = new WeatherController();