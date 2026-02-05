import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useWeatherStore } from '../stores/weatherStore';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading?: boolean;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  loading = false, 
  placeholder 
}) => {
  const { t } = useLanguage();
  const { searchQuery, setSearchQuery, searchResults, setSearchResults } = useWeatherStore();
  const [showResults, setShowResults] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowResults(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // TODO: Implement search API call
    // For now, just show/hide results
    setShowResults(value.length > 0);
  };

  const handleResultClick = (city: string) => {
    setSearchQuery(city);
    onSearch(city);
    setShowResults(false);
  };

  return (
    <div className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder || t('search.placeholder')}
            className="w-full px-4 py-3 pl-12 pr-12 text-white placeholder-white/60 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300"
            disabled={loading}
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
            ) : (
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>

          {/* Clear Button */}
          {searchQuery && !loading && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setShowResults(false);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden z-50"
        >
          {searchResults.map((result, index) => (
            <button
              key={index}
              onClick={() => handleResultClick(result.name)}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
            >
              <div className="font-medium">{result.name}</div>
              <div className="text-sm text-white/60">{result.country}</div>
            </button>
          ))}
        </motion.div>
      )}

      {/* No Results */}
      {showResults && searchQuery && searchResults.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 z-50"
        >
          <p className="text-white/60 text-center">{t('search.no_results')}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;