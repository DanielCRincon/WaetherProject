import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeatherStore } from '../stores/weatherStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { favorites, selectedCity } = useWeatherStore();

  return (
    <div className={`min-h-screen ${resolvedTheme === 'dark' ? 'dark' : ''}`}>
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700" />
      
      {/* Header */}
      <header className="relative z-10 glass-effect border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">☀️</span>
              </div>
              <h1 className="text-2xl font-bold text-white">Weather V2</h1>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/"
                className={`text-white/80 hover:text-white transition-colors ${
                  selectedCity === '' ? 'text-white' : ''
                }`}
              >
                Inicio
              </a>
              <a
                href="/favorites"
                className={`text-white/80 hover:text-white transition-colors relative`}
              >
                Favoritos
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </a>
              <a
                href="/settings"
                className="text-white/80 hover:text-white transition-colors"
              >
                Configuración
              </a>
            </nav>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Cambiar tema"
              >
                {resolvedTheme === 'dark' ? '🌙' : '☀️'}
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Change language"
              >
                {language === 'es' ? '🇪🇸' : '🇬🇧'}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Menu"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-effect border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-white/60 text-sm">
            <p>Weather App V2 - Made with ❤️ in Colombia</p>
            <p className="mt-2">Powered by OpenWeather API</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;