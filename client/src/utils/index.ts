import React from 'react';
import { toast } from 'react-hot-toast';

// Toast notification utilities
export const toastUtils = {
  // Success toast
  success: (message: string, options?: any) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'rgba(34, 197, 94, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      ...options,
    });
  },

  // Error toast
  error: (message: string, options?: any) => {
    toast.error(message, {
      duration: 6000,
      position: 'top-right',
      style: {
        background: 'rgba(239, 68, 68, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      ...options,
    });
  },

  // Info toast
  info: (message: string, options?: any) => {
    toast(message, {
      icon: 'ℹ️',
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'rgba(59, 130, 246, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      ...options,
    });
  },

  // Warning toast
  warning: (message: string, options?: any) => {
    toast(message, {
      icon: '⚠️',
      duration: 5000,
      position: 'top-right',
      style: {
        background: 'rgba(245, 158, 11, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      ...options,
    });
  },

  // Loading toast
  loading: (message: string, options?: any) => {
    toast.loading(message, {
      position: 'top-right',
      style: {
        background: 'rgba(107, 114, 128, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      ...options,
    });
  },

  // Custom toast with emoji
  custom: (message: string, emoji: string, options?: any) => {
    toast(message, {
      icon: emoji,
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'rgba(16, 185, 129, 0.9)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      ...options,
    });
  },
};

// Date utilities
export const dateUtils = {
  // Format date to relative time
  formatRelative: (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'hace un momento';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
    } else {
      return date.toLocaleDateString('es-CO');
    }
  },

  // Format date to readable string
  formatReadable: (date: Date): string => {
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  // Format time to readable string
  formatTime: (date: Date): string => {
    return date.toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Format datetime to readable string
  formatDateTime: (date: Date): string => {
    return date.toLocaleString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Check if date is today
  isToday: (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  },

  // Check if date is yesterday
  isYesterday: (date: Date): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  },

  // Check if date is this week
  isThisWeek: (date: Date): boolean => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() + (6 - now.getDay())));
    return date >= startOfWeek && date <= endOfWeek;
  },
};

// String utilities
export const stringUtils = {
  // Capitalize first letter
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  // Convert to title case
  titleCase: (str: string): string => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
  },

  // Truncate string with ellipsis
  truncate: (str: string, maxLength: number): string => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength - 3) + '...';
  },

  // Slugify string
  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },

  // Generate random ID
  generateId: (length: number = 8): string => {
    return Math.random().toString(36).substring(2, 2 + length);
  },

  // Validate email
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate URL
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

// Number utilities
export const numberUtils = {
  // Format number with commas
  formatWithCommas: (num: number): string => {
    return num.toLocaleString();
  },

  // Round to decimal places
  roundTo: (num: number, decimals: number): number => {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  // Format percentage
  formatPercentage: (num: number, decimals: number = 1): string => {
    return `${(num * 100).toFixed(decimals)}%`;
  },

  // Format currency
  formatCurrency: (num: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(num);
  },

  // Convert Celsius to Fahrenheit
  celsiusToFahrenheit: (celsius: number): number => {
    return (celsius * 9/5) + 32;
  },

  // Convert Fahrenheit to Celsius
  fahrenheitToCelsius: (fahrenheit: number): number => {
    return (fahrenheit - 32) * 5/9;
  },

  // Convert km/h to mph
  kmhToMph: (kmh: number): number => {
    return kmh * 0.621371;
  },

  // Convert mph to km/h
  mphToKmh: (mph: number): number => {
    return mph * 1.60934;
  },
};

// Array utilities
export const arrayUtils = {
  // Remove duplicates from array
  unique: <T>(arr: T[]): T[] => {
    return [...new Set(arr)];
  },

  // Sort array by key
  sortBy: <T>(arr: T[], key: keyof T): T[] => {
    return [...arr].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  },

  // Group array by key
  groupBy: <T>(arr: T[], key: keyof T): Record<string, T[]> => {
    return arr.reduce((groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  },

  // Chunk array into smaller arrays
  chunk: <T>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },

  // Shuffle array
  shuffle: <T>(arr: T[]): T[] => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
};

// Object utilities
export const objectUtils = {
  // Deep clone object
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  // Merge objects
  merge: <T extends Record<string, any>>(...objs: T[]): T => {
    return objs.reduce((result, obj) => ({ ...result, ...obj }), {} as T);
  },

  // Pick properties from object
  pick: <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  // Omit properties from object
  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj } as Omit<T, K>;
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  },

  // Check if object is empty
  isEmpty: (obj: any): boolean => {
    return Object.keys(obj).length === 0;
  },
};

export default {
  toastUtils,
  dateUtils,
  stringUtils,
  numberUtils,
  arrayUtils,
  objectUtils,
};