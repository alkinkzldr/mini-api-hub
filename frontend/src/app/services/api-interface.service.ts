/**
 * API Interface Service
 * 
 * This service handles all HTTP communication with the backend API for API interfaces and endpoints.
 * 
 * In Angular, services are used to:
 * - Share data between components
 * - Handle business logic
 * - Make HTTP requests to APIs
 * - Centralize code that multiple components need
 * 
 * @Injectable Decorator:
 * - Tells Angular that this class can be injected into other classes
 * - `providedIn: 'root'` means this service is available app-wide (singleton)
 * - Angular will create ONE instance of this service and share it everywhere
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Import the models we created
import { ApiInterface } from '../models/api-interface.model';
import { ApiEndpoint } from '../models/api-endpoint.model';

// Import environment configuration
import { environment } from '../../environments/environment';

/**
 * Injectable Service Class
 * 
 * @class ApiInterfaceService
 * 
 * This service provides methods to interact with the backend API.
 * All methods return Observables, which are Angular's way of handling asynchronous operations.
 */
@Injectable({
  providedIn: 'root' // Makes this service available throughout the entire application
})
export class ApiInterfaceService {

  /**
   * Base URL for API calls
   * 
   * @private
   * @type {string}
   * 
   * The `private` keyword means this property can only be accessed within this class.
   * We read the API URL from the environment configuration file.
   * 
   * Example: 'http://localhost:8080'
   */
  private apiUrl = environment.apiUrl;

  /**
   * Constructor - Dependency Injection
   * 
   * @param {HttpClient} http - Angular's HTTP client for making API requests
   * 
   * Dependency Injection (DI) is a design pattern where:
   * - Instead of creating objects yourself, Angular creates them for you
   * - You just declare what you need in the constructor
   * - Angular automatically provides (injects) the HttpClient
   * 
   * This makes testing easier and keeps code loosely coupled.
   */
  constructor(private http: HttpClient) {
    // The `private` keyword here is TypeScript shorthand that:
    // 1. Creates a property called `http`
    // 2. Makes it private (only accessible in this class)
    // 3. Automatically assigns the injected value to it
  }

  /**
   * Get all API interfaces
   * 
   * @returns {Observable<ApiInterface[]>}
   * 
   * Observable explained:
   * - An Observable is like a promise, but more powerful
   * - It represents a stream of data over time
   * - You subscribe to it to get the data when it arrives
   * - `<ApiInterface[]>` is a generic type - means "Observable that emits an array of ApiInterface"
   * 
   * HTTP GET request:
   * - GET is used to retrieve data (read-only)
   * - No data is sent in the request body
   * - Returns a list of all API interfaces
   */
  getAllInterfaces(): Observable<ApiInterface[]> {
    // http.get() makes a GET request
    // The generic <ApiInterface[]> tells TypeScript what type of data to expect
    // In production, apiUrl is empty, so we use /api/interfaces (relative URL)
    // In development, apiUrl is http://localhost:8080, so we use ${apiUrl}/api/interfaces
    const url = this.apiUrl ? `${this.apiUrl}/api/interfaces` : '/api/interfaces';
    return this.http.get<ApiInterface[]>(url)
      .pipe(
        // .pipe() allows us to chain RxJS operators
        // catchError() catches any errors that occur during the HTTP request
        catchError(this.handleError)
      );
  }

  /**
   * Get a single API interface by ID
   * 
   * @param {number} id - The unique identifier of the API interface
   * @returns {Observable<ApiInterface>}
   * 
   * Method parameters:
   * - `id: number` - TypeScript type annotation ensures only numbers can be passed
   * - Template literals (backticks) allow us to insert variables: `${id}`
   */
  getInterfaceById(id: number): Observable<ApiInterface> {
    const url = this.apiUrl ? `${this.apiUrl}/api/interfaces/${id}` : `/api/interfaces/${id}`;
    return this.http.get<ApiInterface>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get an API interface by name
   * 
   * @param {string} name - The name of the API interface
   * @returns {Observable<ApiInterface>}
   */
  getInterfaceByName(name: string): Observable<ApiInterface> {
    const url = this.apiUrl ? `${this.apiUrl}/api/interfaces/name/${encodeURIComponent(name)}` : `/api/interfaces/name/${encodeURIComponent(name)}`;
    return this.http.get<ApiInterface>(url)
      .pipe(
        catchError(this.handleError)
      );
    // encodeURIComponent() safely encodes special characters in URLs
  }

  /**
   * Create a new API interface
   * 
   * @param {ApiInterface} apiInterface - The API interface data to create
   * @returns {Observable<ApiInterface>}
   * 
   * HTTP POST request:
   * - POST is used to create new resources
   * - The data is sent in the request body (second parameter)
   * - Returns the created API interface (usually with the generated ID)
   */
  createInterface(apiInterface: ApiInterface): Observable<ApiInterface> {
    const url = this.apiUrl ? `${this.apiUrl}/api/interfaces` : '/api/interfaces';
    return this.http.post<ApiInterface>(url, apiInterface)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update an existing API interface
   * 
   * @param {number} id - The ID of the API interface to update
   * @param {ApiInterface} apiInterface - The updated API interface data
   * @returns {Observable<ApiInterface>}
   * 
   * HTTP PUT request:
   * - PUT is used to update/replace an entire resource
   * - Requires the resource ID in the URL
   * - Sends the complete updated object in the request body
   */
  updateInterface(id: number, apiInterface: ApiInterface): Observable<ApiInterface> {
    const url = this.apiUrl ? `${this.apiUrl}/api/interfaces/${id}` : `/api/interfaces/${id}`;
    return this.http.put<ApiInterface>(url, apiInterface)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete an API interface
   * 
   * @param {number} id - The ID of the API interface to delete
   * @returns {Observable<void>}
   * 
   * HTTP DELETE request:
   * - DELETE removes a resource from the server
   * - Returns void (nothing) on success
   * - The resource is permanently deleted
   */
  deleteInterface(id: number): Observable<void> {
    const url = this.apiUrl ? `${this.apiUrl}/api/interfaces/${id}` : `/api/interfaces/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Get all endpoints for a specific API interface
   * 
   * @param {number} apiId - The ID of the API interface
   * @returns {Observable<ApiEndpoint[]>}
   * 
   * This is a nested resource - endpoints belong to an API interface
   */
  getEndpointsByApiId(apiId: number): Observable<ApiEndpoint[]> {
    const url = this.apiUrl ? `${this.apiUrl}/api/interfaces/${apiId}/endpoints` : `/api/interfaces/${apiId}/endpoints`;
    return this.http.get<ApiEndpoint[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Error Handler
   * 
   * @private
   * @param {HttpErrorResponse} error - The error object from the HTTP request
   * @returns {Observable<never>}
   * 
   * This is a private method (only used within this class) that handles errors.
   * 
   * RxJS throwError():
   * - Creates an Observable that immediately errors
   * - This allows components to handle errors in their own way
   * 
   * Error handling flow:
   * 1. HTTP request fails
   * 2. catchError() catches it
   * 3. This method processes it
   * 4. throwError() sends it to the component's error handler
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    // Check what type of error occurred
    if (error.error instanceof ErrorEvent) {
      // Client-side error (network issue, browser problem)
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error (backend returned an error status)
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    // Log the error (in a real app, you'd send this to a logging service)
    console.error(errorMessage);
    
    // Return an Observable that errors
    // Components can catch this with .subscribe({ error: ... })
    return throwError(() => new Error(errorMessage));
  }
}

/**
 * Usage Example in a Component:
 * 
 * constructor(private apiService: ApiInterfaceService) {}
 * 
 * ngOnInit() {
 *   // Subscribe to the Observable
 *   this.apiService.getAllInterfaces().subscribe({
 *     // Success callback - called when data arrives
 *     next: (interfaces) => {
 *       this.interfaces = interfaces;
 *     },
 *     // Error callback - called if request fails
 *     error: (error) => {
 *       console.error('Failed to load interfaces:', error);
 *     }
 *   });
 * }
 */

