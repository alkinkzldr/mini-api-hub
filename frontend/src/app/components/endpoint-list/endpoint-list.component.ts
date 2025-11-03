/**
 * Endpoint List Component
 * 
 * This component displays a list of endpoints for a specific API interface.
 * It receives the API ID as an input property from its parent component.
 */

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Subject, takeUntil } from 'rxjs';

import { ApiInterfaceService } from '../../services/api-interface.service';
import { ApiEndpoint } from '../../models/api-endpoint.model';

@Component({
  selector: 'app-endpoint-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './endpoint-list.component.html',
  styleUrl: './endpoint-list.component.css'
})
export class EndpointListComponent implements OnInit, OnDestroy {
  /**
   * Input property - API Interface ID
   * 
   * @Input() decorator makes this property available to parent components
   * Parent component can pass a value like: <app-endpoint-list [apiId]="123">
   * 
   * @type {number | null}
   */
  @Input() apiId: number | null = null;

  /**
   * List of endpoints
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
   * Table columns to display
   * 
   * @type {string[]}
   * 
   * Material Table:
   * - displayedColumns defines which columns to show
   * - Each string corresponds to a property in the data
   */
  displayedColumns: string[] = ['method', 'path', 'description', 'status'];

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
   */
  constructor(private apiService: ApiInterfaceService) {}

  /**
   * ngOnInit
   * 
   * Load endpoints when component initializes
   */
  ngOnInit(): void {
    if (this.apiId) {
      this.loadEndpoints();
    }
  }

  /**
   * ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load endpoints for this API
   * 
   * @private
   */
  private loadEndpoints(): void {
    if (!this.apiId) {
      return;
    }

    this.isLoading = true;

    this.apiService.getEndpointsByApiId(this.apiId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (endpoints) => {
          this.endpoints = endpoints;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading endpoints:', error);
          this.isLoading = false;
        }
      });
  }
}
