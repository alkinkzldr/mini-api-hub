/**
 * Environment Configuration - Production
 * 
 * This file contains environment-specific configuration for PRODUCTION mode.
 * When you run `ng build --configuration=production`, Angular uses this file.
 * 
 * In Docker, the frontend and backend are served from the same origin (same domain/port),
 * so we can use relative URLs or the backend service name in Docker Compose.
 */

export const environment = {
  /**
   * Production Mode Flag
   * 
   * @type {boolean}
   * Set to true in production to disable debugging features and enable optimizations.
   */
  production: true,
  
  /**
   * API Base URL for Docker/Production
   * 
   * @type {string}
   * In production, nginx proxies /api/* requests to the backend.
   * So we can use relative URLs - the browser will make requests to the same origin.
   * nginx will forward /api/* to http://app:8080/api/*
   * 
   * Using '' (empty string) means relative URLs, which is better for production.
   * Alternatively, we could use '/api' but the service already handles the /api prefix.
   */
  apiUrl: ''
} as const;

