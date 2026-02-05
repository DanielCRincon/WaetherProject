import axios, { AxiosResponse } from 'axios';
import { WeatherData, ForecastData, AirQualityData, OpenWeatherResponse } from '@/types';
import { logger } from '@/utils/logger';
import { redis } from '@/config/redis';

export class WeatherService {
  private readonly apiKey: string;
  private readonly baseURL = 'https://api.openweathermap.org/data/2.5';
  private readonly baseURLGeo = 'https://api.openweathermap.org/geo/1.0';
  private readonly baseURLAir = 'https://api.openweathermap.org/data/2.5/air_pollution';

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY!;
    if (!this.apiKey) {
      throw new Error('OpenWeather API key is required');
    }
  }

  async getCurrentWeather(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> {
    const cacheKey = `weather:current:${city}:${units}`;
    
    // Try to get from cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      logger.info(`Cache hit for current weather: ${city}`);
      return JSON.parse(cached);
    }

    try {
      const response: AxiosResponse<OpenWeatherResponse> = await axios.get(
        `${this.baseURL}/weather`,
        {
          params: {
            q: city,
            appid: this.apiKey,
            units,
            lang: 'es'
          },
          timeout: 5000
        }
      );

      const weatherData = this.transformCurrentWeather(response.data);
      
      // Cache for 10 minutes
      await redis.setex(cacheKey, 600, JSON.stringify(weatherData));
      
      logger.info(`Current weather fetched for ${city}`);
      return weatherData;
    } catch (error) {
      logger.error(`Error fetching current weather for ${city}:`, error);
      throw new Error('No se pudo obtener el clima actual');
    }
  }

  async getForecast(city: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> {
    const cacheKey = `weather:forecast:${city}:${units}`;
    
    // Try to get from cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      logger.info(`Cache hit for forecast: ${city}`);
      return JSON.parse(cached);
    }

    try {
      // Get current weather and 5-day forecast
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`${this.baseURL}/weather`, {
          params: { q: city, appid: this.apiKey, units, lang: 'es' },
          timeout: 5000
        }),
        axios.get(`${this.baseURL}/forecast`, {
          params: { q: city, appid: this.apiKey, units, lang: 'es' },
          timeout: 5000
        })
      ]);

      const forecastData = this.transformForecastData(currentResponse.data, forecastResponse.data);
      
      // Cache for 15 minutes
      await redis.setex(cacheKey, 900, JSON.stringify(forecastData));
      
      logger.info(`Forecast fetched for ${city}`);
      return forecastData;
    } catch (error) {
      logger.error(`Error fetching forecast for ${city}:`, error);
      throw new Error('No se pudo obtener el pronóstico');
    }
  }

  async getAirQuality(lat: number, lon: number): Promise<AirQualityData> {
    const cacheKey = `air:quality:${lat}:${lon}`;
    
    // Try to get from cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      logger.info(`Cache hit for air quality: ${lat},${lon}`);
      return JSON.parse(cached);
    }

    try {
      const response = await axios.get(`${this.baseURLAir}`, {
        params: {
          lat,
          lon,
          appid: this.apiKey
        },
        timeout: 5000
      });

      const airQualityData = this.transformAirQuality(response.data);
      
      // Cache for 30 minutes
      await redis.setex(cacheKey, 1800, JSON.stringify(airQualityData));
      
      logger.info(`Air quality fetched for ${lat},${lon}`);
      return airQualityData;
    } catch (error) {
      logger.error(`Error fetching air quality for ${lat},${lon}:`, error);
      throw new Error('No se pudo obtener la calidad del aire');
    }
  }

  async searchCities(query: string, limit: number = 5): Promise<Array<{name: string, country: string, lat: number, lon: number}>> {
    try {
      const response = await axios.get(`${this.baseURLGeo}/direct`, {
        params: {
          q: query,
          limit,
          appid: this.apiKey
        },
        timeout: 5000
      });

      return response.data.map((city: any) => ({
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon
      }));
    } catch (error) {
      logger.error(`Error searching cities for ${query}:`, error);
      throw new Error('No se pudo buscar ciudades');
    }
  }

  async getWeatherByCoordinates(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> {
    const cacheKey = `weather:coords:${lat}:${lon}:${units}`;
    
    // Try to get from cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      logger.info(`Cache hit for coordinates weather: ${lat},${lon}`);
      return JSON.parse(cached);
    }

    try {
      const response: AxiosResponse<OpenWeatherResponse> = await axios.get(
        `${this.baseURL}/weather`,
        {
          params: {
            lat,
            lon,
            appid: this.apiKey,
            units,
            lang: 'es'
          },
          timeout: 5000
        }
      );

      const weatherData = this.transformCurrentWeather(response.data);
      
      // Cache for 10 minutes
      await redis.setex(cacheKey, 600, JSON.stringify(weatherData));
      
      logger.info(`Weather fetched for coordinates: ${lat},${lon}`);
      return weatherData;
    } catch (error) {
      logger.error(`Error fetching weather for coordinates ${lat},${lon}:`, error);
      throw new Error('No se pudo obtener el clima por coordenadas');
    }
  }

  private transformCurrentWeather(data: OpenWeatherResponse): WeatherData {
    return {
      location: {
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      current: {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, // Convert to km
        uvIndex: 0, // Not available in current weather endpoint
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        cloudCover: data.clouds.all,
        dewPoint: 0 // Would need additional calculation
      },
      condition: {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        code: data.weather[0].id
      },
      timestamps: {
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        observation: data.dt
      }
    };
  }

  private transformForecastData(currentData: OpenWeatherResponse, forecastData: any): ForecastData {
    const current = this.transformCurrentWeather(currentData);
    
    // Group forecast data by day
    const dailyForecasts = new Map();
    
    forecastData.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!dailyForecasts.has(date)) {
        dailyForecasts.set(date, {
          date,
          day: {
            maxTemp: -Infinity,
            minTemp: Infinity,
            condition: {
              main: item.weather[0].main,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
              code: item.weather[0].id
            },
            humidity: 0,
            windSpeed: 0,
            precipitationChance: 0,
            precipitationAmount: 0,
            uvIndex: 0
          },
          hourly: []
        });
      }
      
      const dayForecast = dailyForecasts.get(date);
      
      // Update day stats
      dayForecast.day.maxTemp = Math.max(dayForecast.day.maxTemp, item.main.temp_max);
      dayForecast.day.minTemp = Math.min(dayForecast.day.minTemp, item.main.temp_min);
      dayForecast.day.humidity = (dayForecast.day.humidity + item.main.humidity) / 2;
      dayForecast.day.windSpeed = (dayForecast.day.windSpeed + item.wind.speed) / 2;
      dayForecast.day.precipitationChance = Math.max(dayForecast.day.precipitationChance, (item.pop || 0) * 100);
      dayForecast.day.precipitationAmount += (item.rain?.['3h'] || 0);
      
      // Add hourly data
      dayForecast.hourly.push({
        time: new Date(item.dt * 1000).toISOString(),
        temperature: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        condition: {
          main: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          code: item.weather[0].id
        },
        precipitationChance: (item.pop || 0) * 100,
        windSpeed: item.wind.speed,
        humidity: item.main.humidity,
        pressure: item.main.pressure
      });
    });

    return {
      location: current.location,
      current: current.current,
      condition: current.condition,
      forecast: Array.from(dailyForecasts.values()).slice(0, 7) // 7-day forecast
    };
  }

  private transformAirQuality(data: any): AirQualityData {
    const aqi = data.list[0].main.aqi;
    const components = data.list[0].components;
    
    const aqiDescriptions = [
      { range: [0, 50], desc: 'Buena', color: '#00E400' },
      { range: [51, 100], desc: 'Moderada', color: '#FFFF00' },
      { range: [101, 150], desc: 'Insalubre para grupos sensibles', color: '#FF7E00' },
      { range: [151, 200], desc: 'Insalubre', color: '#FF0000' },
      { range: [201, 300], desc: 'Muy insalubre', color: '#8F3F97' },
      { range: [301, 500], desc: 'Peligrosa', color: '#7E0023' }
    ];
    
    const aqiInfo = aqiDescriptions.find(info => aqi >= info.range[0] && aqi <= info.range[1]) || aqiDescriptions[0];
    
    return {
      location: {
        name: 'Unknown',
        country: 'Unknown',
        lat: data.coord?.lat || 0,
        lon: data.coord?.lon || 0
      },
      aqi,
      components,
      description: aqiInfo.desc,
      color: aqiInfo.color
    };
  }
}