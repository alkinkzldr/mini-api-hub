/**
 * API Interface Form Component
 * 
 * This component provides a form for creating and editing API interfaces.
 * It detects whether it's in "create" or "edit" mode based on the route.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';

import { ApiInterfaceService } from '../../services/api-interface.service';
import { ApiInterface } from '../../models/api-interface.model';

@Component({
  selector: 'app-api-interface-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Required for reactive forms
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './api-interface-form.component.html',
  styleUrl: './api-interface-form.component.css'
})
export class ApiInterfaceFormComponent implements OnInit, OnDestroy {
  /**
   * Form Group
   * 
   * @type {FormGroup}
   * 
   * Reactive Forms in Angular:
   * - FormGroup is a collection of form controls
   * - Each control represents a form field (input, select, etc.)
   * - FormBuilder makes it easy to create forms
   */
  form!: FormGroup;

  /**
   * Whether we're in edit mode
   * 
   * @type {boolean}
   */
  isEditMode: boolean = false;

  /**
   * Current API interface ID (if editing)
   * 
   * @type {number | null}
   */
  apiId: number | null = null;

  /**
   * Loading state
   * 
   * @type {boolean}
   */
  isLoading: boolean = false;

  /**
   * Is form being submitted
   * 
   * @type {boolean}
   */
  isSubmitting: boolean = false;

  /**
   * RxJS Subject for cleanup
   * 
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Constructor
   * 
   * @param {FormBuilder} fb - Angular's FormBuilder for creating forms
   * @param {ApiInterfaceService} apiService - Service for API calls
   * @param {ActivatedRoute} route - Route service
   * @param {Router} router - Router for navigation
   */
  constructor(
    private fb: FormBuilder, // FormBuilder simplifies form creation
    private apiService: ApiInterfaceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * ngOnInit
   * 
   * Initialize form and check if we're editing or creating.
   */
  ngOnInit(): void {
    // Initialize the form with empty values
    this.initializeForm();

    // Check if we're in edit mode
    // Check both route path and params
    const id = this.route.snapshot.paramMap.get('id');
    const isEditRoute = this.route.snapshot.url.some(segment => segment.path === 'edit');

    if (id && isEditRoute) {
      // Edit mode - load existing data
      this.isEditMode = true;
      this.apiId = parseInt(id, 10);
      this.loadApiInterface(this.apiId);
    } else {
      // Create mode - form is already initialized with empty values
      this.isEditMode = false;
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
   * Initialize the form with empty values
   * 
   * @private
   * 
   * FormBuilder.group() creates a FormGroup
   * Each field can have:
   * - Initial value (first parameter)
   * - Validators (second parameter)
   * 
   * Validators:
   * - Validators.required: Field must have a value
   * - Validators.minLength(n): Minimum length
   * - Validators.email: Must be valid email format
   * - etc.
   */
  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      type: ['REST', [Validators.required]],
      base_url: ['', [Validators.required]],
      description: [''],
      auth_type: ['NONE'],
      is_active: [true]
    });
  }

  /**
   * Load API interface for editing
   * 
   * @param {number} id - The API interface ID
   * @private
   */
  private loadApiInterface(id: number): void {
    this.isLoading = true;

    this.apiService.getInterfaceById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (api) => {
          // Populate form with existing data
          // form.patchValue() updates form values without requiring all fields
          this.form.patchValue({
            name: api.name || '',
            type: api.type || 'REST',
            base_url: api.base_url || '',
            description: api.description || '',
            auth_type: api.auth_type || 'NONE',
            is_active: api.is_active !== null ? api.is_active : true
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading API interface:', error);
          this.isLoading = false;
          alert('Failed to load API interface. Redirecting...');
          this.router.navigate(['/api-interfaces']);
        }
      });
  }

  /**
   * Handle form submission
   * 
   * @returns {void}
   * 
   * This method is called when the user clicks "Save"
   */
  onSubmit(): void {
    // Check if form is valid
    // form.valid is true only if all validators pass
    if (this.form.invalid) {
      // Mark all fields as touched to show validation errors
      // This makes Angular show error messages for invalid fields
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    // Get form values
    // form.value is an object containing all form field values
    const formValue = this.form.value;

    // Create API interface object
    const apiInterface: ApiInterface = {
      id: this.isEditMode ? this.apiId : null,
      name: formValue.name,
      type: formValue.type,
      base_url: formValue.base_url,
      description: formValue.description || null,
      auth_type: formValue.auth_type || null,
      is_active: formValue.is_active !== undefined ? formValue.is_active : true,
      created_at: null,
      updated_at: null,
      endpoints: null
    };

    // Call appropriate service method
    const request = this.isEditMode && this.apiId
      ? this.apiService.updateInterface(this.apiId, apiInterface)
      : this.apiService.createInterface(apiInterface);

    request
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (saved) => {
          this.isSubmitting = false;
          // Navigate to detail page after successful save
          if (saved.id) {
            this.router.navigate(['/api-interfaces', saved.id]);
          } else {
            this.router.navigate(['/api-interfaces']);
          }
        },
        error: (error) => {
          console.error('Error saving API interface:', error);
          this.isSubmitting = false;
          alert('Failed to save API interface. Please try again.');
        }
      });
  }

  /**
   * Cancel form and go back
   * 
   * @returns {void}
   */
  cancel(): void {
    this.router.navigate(['/api-interfaces']);
  }

  /**
   * Get form control for easier access in template
   * 
   * @param {string} controlName - Name of the form control
   * @returns Form control or null
   * 
   * Helper method to make template code cleaner
   * Instead of form.get('name') in template, we can use getControl('name')
   */
  getControl(controlName: string) {
    return this.form.get(controlName);
  }
}
