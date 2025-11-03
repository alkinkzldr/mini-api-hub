/**
 * API Interface List Component
 * 
 * This component displays a list of all API interfaces in a card-based layout.
 * It's the main entry point of the application.
 * 
 * Component Responsibilities:
 * - Display all API interfaces
 * - Allow navigation to detail view
 * - Provide "Create New" button
 * - Handle search/filter functionality
 * - Delete API interfaces
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Provides *ngFor, *ngIf directives
import { Router, RouterModule } from '@angular/router'; // For navigation
import { MatCardModule } from '@angular/material/card'; // Material card component
import { MatButtonModule } from '@angular/material/button'; // Material button
import { MatIconModule } from '@angular/material/icon'; // Material icons
import { MatInputModule } from '@angular/material/input'; // Material input field
import { MatFormFieldModule } from '@angular/material/form-field'; // Material form field
import { FormsModule } from '@angular/forms'; // For two-way binding [(ngModel)]
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // For confirmation dialogs
import { Subject, takeUntil } from 'rxjs'; // RxJS for managing subscriptions

// Import our service and models
import { ApiInterfaceService } from '../../services/api-interface.service';
import { ApiInterface } from '../../models/api-interface.model';

/**
 * @Component Decorator
 * 
 * This decorator tells Angular that this class is a component.
 * 
 * Properties:
 * - selector: The HTML tag name to use this component (<app-api-interface-list>)
 * - standalone: true means this component doesn't need to be in an NgModule
 * - imports: List of Angular modules/components this component needs
 * - templateUrl: The HTML template file
 * - styleUrl: The CSS file for this component
 */
@Component({
  selector: 'app-api-interface-list',
  standalone: true,
  imports: [
    CommonModule, // Provides *ngFor, *ngIf, etc.
    RouterModule, // For routerLink directive
    MatCardModule, // Material card
    MatButtonModule, // Material button
    MatIconModule, // Material icons
    MatInputModule, // Material input
    MatFormFieldModule, // Material form field
    FormsModule, // For [(ngModel)]
    MatDialogModule // For dialogs
  ],
  templateUrl: './api-interface-list.component.html',
  styleUrl: './api-interface-list.component.css'
})
export class ApiInterfaceListComponent implements OnInit, OnDestroy {
  /**
   * List of all API interfaces
   * 
   * @type {ApiInterface[]}
   * 
   * TypeScript type annotation:
   * - `ApiInterface[]` means an array of ApiInterface objects
   * - Initialized as empty array `[]`
   * - Will be populated when data loads from the API
   */
  apiInterfaces: ApiInterface[] = [];

  /**
   * Filtered list of API interfaces (for search functionality)
   * 
   * @type {ApiInterface[]}
   * 
   * This is what actually gets displayed in the template.
   * When user searches, we filter `apiInterfaces` and put results in `filteredInterfaces`.
   */
  filteredInterfaces: ApiInterface[] = [];

  /**
   * Search term for filtering
   * 
   * @type {string}
   * 
   * Bound to the search input field using two-way binding [(ngModel)]
   * When user types, this value updates automatically.
   */
  searchTerm: string = '';

  /**
   * Loading state indicator
   * 
   * @type {boolean}
   * 
   * Used to show/hide a loading spinner while data is being fetched.
   * Set to true when request starts, false when it completes.
   */
  isLoading: boolean = false;

  /**
   * RxJS Subject for managing component lifecycle
   * 
   * @private
   * @type {Subject<void>}
   * 
   * Used to unsubscribe from Observables when component is destroyed.
   * This prevents memory leaks.
   * 
   * Pattern: We call destroy$.next() in ngOnDestroy() to signal all subscriptions to stop.
   */
  private destroy$ = new Subject<void>();

  /**
   * Constructor - Dependency Injection
   * 
   * @param {ApiInterfaceService} apiService - Service for API calls
   * @param {Router} router - Angular router for navigation
   * @param {MatDialog} dialog - Material dialog service for confirmation dialogs
   * 
   * All these services are automatically injected by Angular.
   */
  constructor(
    private apiService: ApiInterfaceService, // Our custom service
    private router: Router, // Angular's router
    private dialog: MatDialog // Material dialog service
  ) {}

  /**
   * ngOnInit - Component Lifecycle Hook
   * 
   * This method is called automatically by Angular when the component is initialized.
   * It's the perfect place to load data when the component first loads.
   * 
   * Lifecycle hooks:
   * - ngOnInit: Called once after component is created
   * - ngOnDestroy: Called when component is destroyed (cleanup)
   */
  ngOnInit(): void {
    this.loadApiInterfaces();
  }

  /**
   * ngOnDestroy - Component Lifecycle Hook
   * 
   * Called when the component is about to be destroyed (user navigates away).
   * We use this to clean up subscriptions to prevent memory leaks.
   */
  ngOnDestroy(): void {
    // Signal all subscriptions to unsubscribe
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load all API interfaces from the backend
   * 
   * @returns {void}
   * 
   * This method:
   * 1. Sets loading state to true
   * 2. Calls the service to get data
   * 3. Subscribes to the Observable
   * 4. Handles the response or error
   */
  loadApiInterfaces(): void {
    this.isLoading = true;

    // Subscribe to the Observable
    // takeUntil(this.destroy$) automatically unsubscribes when component is destroyed
    this.apiService.getAllInterfaces()
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when destroy$ emits
      .subscribe({
        // Success callback - called when data arrives
        next: (interfaces) => {
          this.apiInterfaces = interfaces;
          this.filteredInterfaces = interfaces; // Initialize filtered list
          this.isLoading = false;
        },
        // Error callback - called if request fails
        error: (error) => {
          console.error('Error loading API interfaces:', error);
          this.isLoading = false;
          // In a real app, you'd show an error message to the user
        }
      });
  }

  /**
   * Filter API interfaces based on search term
   * 
   * @returns {void}
   * 
   * This method is called whenever the search term changes.
   * It filters the apiInterfaces array and updates filteredInterfaces.
   */
  filterInterfaces(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      // If search is empty, show all interfaces
      this.filteredInterfaces = this.apiInterfaces;
      return;
    }

    // Convert search term to lowercase for case-insensitive search
    const searchLower = this.searchTerm.toLowerCase().trim();

    // Array.filter() creates a new array with only matching items
    // We check if the search term appears in name, type, or description
    this.filteredInterfaces = this.apiInterfaces.filter(api => {
      const name = (api.name || '').toLowerCase();
      const type = (api.type || '').toLowerCase();
      const description = (api.description || '').toLowerCase();

      // Return true if search term matches any field
      return name.includes(searchLower) ||
             type.includes(searchLower) ||
             description.includes(searchLower);
    });
  }

  /**
   * Navigate to API interface detail page
   * 
   * @param {number} id - The ID of the API interface to view
   * @returns {void}
   * 
   * Router.navigate() programmatically navigates to a route.
   * The route will be defined in app.routes.ts
   */
  viewInterface(id: number | null): void {
    if (id) {
      this.router.navigate(['/api-interfaces', id]);
    }
  }

  /**
   * Navigate to create new API interface form
   * 
   * @returns {void}
   */
  createNew(): void {
    this.router.navigate(['/api-interfaces/new']);
  }

  /**
   * Navigate to edit API interface form
   * 
   * @param {number} id - The ID of the API interface to edit
   * @returns {void}
   */
  editInterface(id: number | null): void {
    if (id) {
      this.router.navigate(['/api-interfaces', id, 'edit']);
    }
  }

  /**
   * Delete an API interface with confirmation
   * 
   * @param {ApiInterface} apiInterface - The API interface to delete
   * @returns {void}
   * 
   * This method:
   * 1. Shows a confirmation dialog
   * 2. If confirmed, calls the service to delete
   * 3. Reloads the list after successful deletion
   */
  deleteInterface(apiInterface: ApiInterface): void {
    // Confirm deletion
    const confirmed = confirm(`Are you sure you want to delete "${apiInterface.name}"?`);
    
    if (!confirmed || !apiInterface.id) {
      return; // User cancelled or no ID
    }

    // Call service to delete
    this.apiService.deleteInterface(apiInterface.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Success - reload the list
          this.loadApiInterfaces();
        },
        error: (error) => {
          console.error('Error deleting API interface:', error);
          alert('Failed to delete API interface. Please try again.');
        }
      });
  }
}
