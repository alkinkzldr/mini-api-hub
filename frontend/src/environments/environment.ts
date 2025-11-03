/**
 * Environment Configuration - Development
 * 
 * This file contains environment-specific configuration for DEVELOPMENT mode.
 * When you run `ng serve` or `ng build` without the --configuration=production flag,
 * Angular uses this file.
 * 
 * In TypeScript, we use the `export` keyword to make this object available to other files
 * that import it. The `const` keyword means this value cannot be reassigned.
 * 
 * The `as const` assertion tells TypeScript to treat this as a readonly object,
 * which provides better type safety.
 */

export const environment = {
  /**
   * Production Mode Flag
   * 
   * @type {boolean}
   * Set to false in development to enable debugging features, verbose logging, etc.
   */
  production: false,
  
  /**
   * API Base URL
   * 
   * @type {string}
   * The base URL for all API calls. In development, the Angular app runs on port 4200
   * and the backend runs on port 8080. Since they're on different ports, we need to
   * specify the full URL including the port.
   * 
   * CORS (Cross-Origin Resource Sharing) must be configured on the backend to allow
   * requests from http://localhost:4200
   */
  apiUrl: 'http://localhost:8080'
} as const;

