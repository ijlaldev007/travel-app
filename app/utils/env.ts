/**
 * Environment variables utility
 * 
 * This file provides a type-safe way to access environment variables
 * and includes validation to ensure required variables are present.
 */

/**
 * Get an environment variable with validation
 * @param key - The environment variable key
 * @param defaultValue - Optional default value if not found
 * @returns The environment variable value
 * @throws Error if the variable is not found and no default is provided
 */
export const getEnv = (key: keyof ImportMetaEnv, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  
  return value;
};

/**
 * Firebase configuration
 */
export const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID'),
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID'),
};

/**
 * Application configuration
 */
export const appConfig = {
  name: getEnv('VITE_APP_NAME', 'Raahi'),
  url: getEnv('VITE_APP_URL', 'http://localhost:5173'),
  apiUrl: getEnv('VITE_API_URL', 'http://localhost:5173/api'),
};

/**
 * API keys
 */
export const apiKeys = {
  googleMaps: getEnv('VITE_GOOGLE_MAPS_API_KEY'),
  stripePublishable: getEnv('VITE_STRIPE_PUBLISHABLE_KEY'),
};
