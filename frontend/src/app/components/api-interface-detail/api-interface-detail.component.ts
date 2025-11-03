/**
 * API Interface Detail Component
 * 
 * This component displays detailed information about a single API interface,
 * including all its properties and associated endpoints.
 * 
 * It reads the API interface ID from the route parameters.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Subject, takeUntil } from 'rxjs';

import { ApiInterfaceService } from '../../services/api-interface.service';
import { ApiInterface } from '../../models/api-interface.model';
import { ApiEndpoint } from '../../models/api-endpoint.model';
import { EndpointListComponent } from '../endpoint-list/endpoint-list.component';

@Component({
  selector: 'app-api-interface-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    EndpointListComponent
  ],
  templateUrl: './api-interface-detail.component.html',
  styleUrl: './api-interface-detail.component.css'
})
export class ApiInterfaceDetailComponent implements OnInit, OnDestroy {
  /**
   * The API interface being displayed
   * 
   * @type {ApiInterface | null}
   * 
   * Initially null, will be populated when data loads from the API.
   * The `| null` union type means it can be either ApiInterface or null.
   */
  apiInterface: ApiInterface | null = null;

  /**
   * List of endpoints for this API interface
   * 
   * @type {ApiEndpoint[]}
   */
  endpoints: ApiEndpoint[] = [];

  /**
   * Loading state
   * 
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * Error message if loading fails
   * 
   * @type {string | null}
   */
  error: string | null = null;

  /**
   * RxJS Subject for cleanup
   * 
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Constructor
   * 
   * @param {ApiInterfaceService} apiService - Service for API calls
   * @param {ActivatedRoute} route - Service to access route parameters
   * @param {Router} router - Router for navigation
   * 
   * ActivatedRoute provides access to route parameters, query params, etc.
   * We'll use it to get the `id` from the URL.
   */
  constructor(
    private apiService: ApiInterfaceService,
    private route: ActivatedRoute, // Access route parameters
    private router: Router
  ) {}

  /**
   * ngOnInit - Component Lifecycle Hook
   * 
   * Called when component is initialized.
   * We use this to:
   * 1. Get the ID from route parameters
   * 2. Load the API interface data
   * 3. Load the associated endpoints
   */
  ngOnInit(): void {
    // Get the ID from route parameters
    // route.snapshot.paramMap gets the current route parameters
    // .get('id') gets the 'id' parameter from the route
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Convert string to number using parseInt()
      // The second parameter (10) means base 10 (decimal)
      const apiId = parseInt(id, 10);
      this.loadApiInterface(apiId);
      this.loadEndpoints(apiId);
    } else {
      this.error = 'No API ID provided';
    }
  }

  /**
   * ngOnDestroy - Cleanup
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load API interface by ID
   * 
   * @param {number} id - The API interface ID
   * @private
   */
  private loadApiInterface(id: number): void {
    this.isLoading = true;
    this.error = null;

    this.apiService.getInterfaceById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (api) => {
          this.apiInterface = api;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading API interface:', error);
          this.error = 'Failed to load API interface';
          this.isLoading = false;
        }
      });
  }

  /**
   * Load endpoints for this API interface
   * 
   * @param {number} apiId - The API interface ID
   * @private
   */
  private loadEndpoints(apiId: number): void {
    this.apiService.getEndpointsByApiId(apiId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (endpoints) => {
          this.endpoints = endpoints;
        },
        error: (error) => {
          console.error('Error loading endpoints:', error);
          // Don't set error state - endpoints are optional
        }
      });
  }

  /**
   * Navigate to edit form
   * 
   * @returns {void}
   */
  edit(): void {
    if (this.apiInterface?.id) {
      this.router.navigate(['/api-interfaces', this.apiInterface.id, 'edit']);
    }
  }

  /**
   * Delete API interface
   * 
   * @returns {void}
   */
  delete(): void {
    if (!this.apiInterface?.id) {
      return;
    }

    const confirmed = confirm(`Are you sure you want to delete "${this.apiInterface.name}"?`);
    if (!confirmed) {
      return;
    }

    this.apiService.deleteInterface(this.apiInterface.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          // Navigate back to list after successful deletion
          this.router.navigate(['/api-interfaces']);
        },
        error: (error) => {
          console.error('Error deleting API interface:', error);
          alert('Failed to delete API interface. Please try again.');
        }
      });
  }

  /**
   * Navigate back to list
   * 
   * @returns {void}
   */
  goBack(): void {
    this.router.navigate(['/api-interfaces']);
  }
}
