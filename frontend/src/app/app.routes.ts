/**
 * Application Routes Configuration
 * 
 * This file defines all the routes (URL paths) in the application.
 * 
 * Routes:
 * - Each route maps a URL path to a component
 * - When user navigates to a path, Angular loads and displays that component
 * - The router replaces the content in <router-outlet>
 * 
 * Route Configuration:
 * - path: The URL path (e.g., '/api-interfaces')
 * - component: The component to display
 * - :id is a route parameter (e.g., /api-interfaces/1 where 1 is the id)
 */

import { Routes } from '@angular/router';

// Import components (we'll create these)
import { ApiInterfaceListComponent } from './components/api-interface-list/api-interface-list.component';
import { ApiInterfaceDetailComponent } from './components/api-interface-detail/api-interface-detail.component';
import { ApiInterfaceFormComponent } from './components/api-interface-form/api-interface-form.component';

/**
 * Application Routes
 * 
 * @type {Routes}
 * 
 * Routes array defines all possible routes in the application.
 * Angular matches routes in order, so put specific routes before wildcard routes.
 */
export const routes: Routes = [
  {
    path: '', // Empty path = root URL (/)
    component: ApiInterfaceListComponent, // Show list component at root
    title: 'API Interfaces' // Browser tab title
  },
  {
    path: 'api-interfaces', // /api-interfaces
    component: ApiInterfaceListComponent,
    title: 'API Interfaces'
  },
  {
    path: 'api-interfaces/new', // /api-interfaces/new
    component: ApiInterfaceFormComponent,
    title: 'Create API Interface'
  },
  {
    path: 'api-interfaces/:id', // /api-interfaces/1 (where 1 is the id)
    component: ApiInterfaceDetailComponent,
    title: 'API Interface Details'
  },
  {
    path: 'api-interfaces/:id/edit', // /api-interfaces/1/edit
    component: ApiInterfaceFormComponent,
    title: 'Edit API Interface'
  },
  // Wildcard route - catches any unmatched paths
  {
    path: '**', // ** means "match anything"
    redirectTo: '', // Redirect to root if path doesn't match any route
    pathMatch: 'full'
  }
];

