/**
 * Root App Component
 * 
 * This is the main/root component of the Angular application.
 * It wraps the entire application and provides the global layout structure.
 * 
 * Every Angular app has at least one root component (this one).
 * It's defined in main.ts and bootstraps the application.
 */

import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'; // Material toolbar
import { MatButtonModule } from '@angular/material/button'; // Material button

/**
 * @Component Decorator
 * 
 * This decorator marks this class as an Angular component.
 * 
 * selector: 'app-root' means this component is used as <app-root> in index.html
 * standalone: true means this component doesn't need to be in an NgModule
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, // Allows <router-outlet> to work
    RouterModule, // Allows routerLink directive
    MatToolbarModule, // Material toolbar component
    MatButtonModule // Material button component
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /**
   * Application Title
   * 
   * @type {string}
   * 
   * This property can be used in the template with {{ title }}
   * Currently not used, but kept for reference.
   */
  title = 'Mini API Hub';
}
