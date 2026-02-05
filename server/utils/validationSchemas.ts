import Joi from 'joi';

export const weatherSchemas = {
  getCurrentWeather: Joi.object({
    params: Joi.object({
      city: Joi.string().required().min(1).max(100)
    }),
    query: Joi.object({
      units: Joi.string().valid('metric', 'imperial').default('metric')
    })
  }),

  getForecast: Joi.object({
    params: Joi.object({
      city: Joi.string().required().min(1).max(100)
    }),
    query: Joi.object({
      units: Joi.string().valid('metric', 'imperial').default('metric')
    })
  }),

  getWeatherByCoordinates: Joi.object({
    query: Joi.object({
      lat: Joi.number().required().min(-90).max(90),
      lon: Joi.number().required().min(-180).max(180),
      units: Joi.string().valid('metric', 'imperial').default('metric')
    })
  }),

  getAirQuality: Joi.object({
    query: Joi.object({
      lat: Joi.number().required().min(-90).max(90),
      lon: Joi.number().required().min(-180).max(180)
    })
  }),

  searchCities: Joi.object({
    query: Joi.object({
      q: Joi.string().required().min(1).max(100),
      limit: Joi.number().integer().min(1).max(20).default(5)
    })
  })
};

export const userSchemas = {
  register: Joi.object({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]')).required(),
      name: Joi.string().min(2).max(100).required(),
      preferences: Joi.object({
        units: Joi.string().valid('metric', 'imperial').default('metric'),
        language: Joi.string().valid('es', 'en').default('es'),
        theme: Joi.string().valid('light', 'dark', 'auto').default('auto'),
        notifications: Joi.object({
          email: Joi.boolean().default(true),
          push: Joi.boolean().default(true),
          weatherAlerts: Joi.boolean().default(true),
          dailyForecast: Joi.boolean().default(false)
        }).default()
      }).default()
    })
  }),

  login: Joi.object({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    })
  }),

  updateProfile: Joi.object({
    body: Joi.object({
      name: Joi.string().min(2).max(100),
      email: Joi.string().email()
    }).min(1)
  }),

  updatePreferences: Joi.object({
    body: Joi.object({
      units: Joi.string().valid('metric', 'imperial'),
      language: Joi.string().valid('es', 'en'),
      theme: Joi.string().valid('light', 'dark', 'auto'),
      notifications: Joi.object({
        email: Joi.boolean(),
        push: Joi.boolean(),
        weatherAlerts: Joi.boolean(),
        dailyForecast: Joi.boolean()
      })
    }).min(1)
  }),

  addFavorite: Joi.object({
    body: Joi.object({
      name: Joi.string().min(1).max(100).required(),
      lat: Joi.number().required().min(-90).max(90),
      lon: Joi.number().required().min(-180).max(180)
    })
  })
};