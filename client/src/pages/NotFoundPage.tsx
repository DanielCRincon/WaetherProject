import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="text-8xl mb-4">🌤️</div>
        <h1 className="text-4xl font-bold text-white mb-4">
          404 - Página No Encontrada
        </h1>
        <p className="text-white/60 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-semibold transition-all duration-300 hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg"
        >
          Volver al Inicio
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;