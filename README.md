# Weather App V2 - Modern Weather Application

A comprehensive, modern weather application with React frontend and Node.js backend, featuring real-time weather data, forecasts, air quality monitoring, and user personalization.

## 🌟 Features

### 🌤️ Weather Information
- **Current Weather**: Real-time weather data for any city
- **7-Day Forecast**: Detailed hourly and daily forecasts
- **Air Quality**: AQI monitoring with health recommendations
- **Weather Maps**: Interactive weather visualization
- **Geolocation**: Automatic location detection

### 👤 User Experience
- **Multi-language Support**: Spanish and English
- **Theme Switching**: Light, dark, and auto themes
- **Unit Preferences**: Metric and imperial units
- **Favorite Locations**: Save and manage preferred cities
- **Weather Alerts**: Customizable notifications

### 🎨 Modern UI/UX
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Live weather data refresh
- **Smooth Animations**: Micro-interactions and transitions
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: Graceful error recovery

## 🏗️ Architecture

### Backend (Node.js + TypeScript)
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Redis caching
- **Authentication**: JWT-based auth system
- **API Documentation**: RESTful API with proper error handling
- **Rate Limiting**: Protection against abuse
- **Logging**: Winston-based logging system

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Zustand for global state
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router v6
- **Forms**: React Hook Form with validation

### External APIs
- **OpenWeather**: Primary weather data source
- **Geocoding**: Location search and autocomplete
- **Air Quality**: Environmental data integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- Redis 6+
- OpenWeather API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/DanielCRincon/WaetherProject.git
cd WaetherProject
git checkout v2-complete-evolution
```

2. **Install dependencies**
```bash
npm install
cd client && npm install && cd ..
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Set up databases**
```bash
# Create PostgreSQL database
createdb weather_app

# Run database schema
psql weather_app < database/schema.sql
```

5. **Start the application**
```bash
# Development mode (starts both frontend and backend)
npm run dev

# Or start separately
npm run server:dev  # Backend on port 3000
npm run client:dev  # Frontend on port 5173
```

### Production Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📡 API Endpoints

### Weather Endpoints
- `GET /api/weather/current/:city` - Current weather
- `GET /api/weather/forecast/:city` - 7-day forecast
- `GET /api/weather/complete/:city` - Complete weather data
- `GET /api/weather/coordinates` - Weather by coordinates
- `GET /api/weather/air-quality` - Air quality data
- `GET /api/weather/search` - City search

### User Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - User profile
- `PUT /api/users/preferences` - Update preferences
- `GET /api/users/favorites` - Favorite locations

## 🎨 Frontend Components

### Weather Display
- **WeatherCard**: Current weather display
- **ForecastCard**: Daily forecast items
- **HourlyForecast**: Hourly weather breakdown
- **AirQualityIndicator**: AQI visualization

### User Interface
- **Header**: Navigation and theme switcher
- **SearchBar**: City search with autocomplete
- **FavoritesList**: Saved locations
- **SettingsPanel**: User preferences

### Layout Components
- **AppLayout**: Main application layout
- **Sidebar**: Navigation and favorites
- **WeatherDashboard**: Main weather display
- **LoadingSpinner**: Loading states

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    name VARCHAR(255),
    preferences JSONB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Favorite Locations
```sql
CREATE TABLE favorite_locations (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    name VARCHAR(255),
    lat DECIMAL(10, 8),
    lon DECIMAL(11, 8),
    added_at TIMESTAMP
);
```

### Weather Cache
```sql
CREATE TABLE weather_cache (
    id UUID PRIMARY KEY,
    cache_key VARCHAR(255) UNIQUE,
    data JSONB,
    expires_at TIMESTAMP
);
```

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=weather_app
DB_USER=postgres
DB_PASSWORD=your_password

# Redis
REDIS_URL=redis://localhost:6379

# OpenWeather API
OPENWEATHER_API_KEY=your_api_key

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## 📊 Monitoring

### Health Checks
- `GET /health` - Application health status
- Database connection monitoring
- Redis connection monitoring
- API response time tracking

### Logging
- Winston-based structured logging
- Error tracking and reporting
- API usage analytics
- Performance metrics

## 🔒 Security

### Authentication
- JWT-based authentication
- Refresh token rotation
- Password hashing with bcrypt
- Session management

### API Security
- Rate limiting per endpoint
- CORS configuration
- Input validation and sanitization
- SQL injection prevention

### Data Protection
- Environment variable encryption
- Secure cookie handling
- HTTPS enforcement in production
- Data anonymization in logs

## 🚀 Performance

### Caching Strategy
- Redis caching for weather data
- Browser caching for static assets
- API response caching
- Database query optimization

### Optimization
- Lazy loading of components
- Image optimization and CDN
- Bundle size optimization
- Server-side rendering ready

## 🌍 Internationalization

### Supported Languages
- Spanish (es) - Primary language
- English (en) - Secondary language

### Localization Features
- Dynamic language switching
- Localized weather descriptions
- Regional unit preferences
- Cultural date/time formats

## 📱 Mobile Compatibility

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Optimized for small screens
- PWA-ready architecture

### Mobile Features
- Geolocation integration
- Touch gestures support
- Offline capability
- Push notifications ready

## 🔮 Future Roadmap

### Phase 2 Features
- [ ] Weather maps integration
- [ ] Historical weather data
- [ ] Advanced analytics dashboard
- [ ] Social sharing features
- [ ] Weather comparison tools

### Phase 3 Features
- [ ] Machine learning predictions
- [ ] Custom weather alerts
- [ ] Integration with smart home devices
- [ ] API for third-party developers
- [ ] Mobile applications (iOS/Android)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenWeather for providing excellent weather APIs
- The React community for amazing tools and libraries
- All contributors who help improve this project

---

**Made with ❤️ in Colombia**  
**Weather App V2** - Modern weather experience for everyone
