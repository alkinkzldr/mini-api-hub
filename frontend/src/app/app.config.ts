/**
 * Application Configuration
 * 
 * This file configures the Angular application with all necessary providers.
 * In Angular's standalone architecture (Angular 19), we use providers instead of
 * NgModules to configure the app.
 * 
 * @type {ApplicationConfig} - TypeScript type annotation ensures type safety
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Material animations
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // HTTP client for API calls

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

/**
 * Application Configuration Object
 * 
 * This object contains all the providers (services) that the application needs.
 * Providers are dependency injection tokens that tell Angular how to create services.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Zone.js change detection - Angular's mechanism for detecting changes in the UI
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Router - enables navigation between different views/components
    provideRouter(routes),
    
    // Client-side hydration - improves performance by reusing server-rendered HTML
    provideClientHydration(withEventReplay()),
    
    // Animations - required for Angular Material components (dialogs, tooltips, etc.)
    provideAnimations(),
    
    // HTTP Client - allows making HTTP requests to the backend API
    // withInterceptorsFromDi enables dependency injection in HTTP interceptors
    provideHttpClient(withInterceptorsFromDi())
  ]
};
