// Environment configuration
export const ENV = {
  // API Configuration
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL,
  
  // App Configuration
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME || 'Recipe Finder',
  
  // Feature Flags
  ENABLE_FAVORITES: process.env.EXPO_PUBLIC_ENABLE_FAVORITES !== 'false',
  ENABLE_SEARCH: process.env.EXPO_PUBLIC_ENABLE_SEARCH !== 'false',
  
  // Development
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
}; 