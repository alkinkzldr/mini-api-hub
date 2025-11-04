# Task List: Frontend API Management Interface

Based on: `prd-frontend-api-management.md`

## Relevant Files

- `frontend/package.json` - Package dependencies, needs Angular Material packages added
- `frontend/src/app/app.config.ts` - Angular application configuration, needs Material theme imports
- `frontend/src/styles.css` - Global styles, needs Material theme import
- `frontend/src/environments/environment.ts` - Environment configuration for API base URL (to be created)
- `frontend/src/environments/environment.prod.ts` - Production environment configuration (to be created)
- `frontend/src/app/services/api-interface.service.ts` - Service for API interface HTTP calls
- `frontend/src/app/models/api-interface.model.ts` - TypeScript model for API interface (to be created)
- `frontend/src/app/models/api-endpoint.model.ts` - TypeScript model for API endpoint (to be created)
- `frontend/src/app/components/api-interface-list/api-interface-list.component.ts` - Component for listing API interfaces (to be created)
- `frontend/src/app/components/api-interface-detail/api-interface-detail.component.ts` - Component for viewing API interface details (to be created)
- `frontend/src/app/components/api-interface-form/api-interface-form.component.ts` - Component for creating/editing API interfaces (to be created)
- `frontend/src/app/components/endpoint-list/endpoint-list.component.ts` - Component for listing endpoints (to be created)
- `frontend/src/app/components/endpoint-form/endpoint-form.component.ts` - Component for creating/editing endpoints (to be created)
- `frontend/src/app/app.routes.ts` - Routing configuration
- `frontend/src/app/app.component.html` - Main app layout template
- `frontend/Dockerfile` - Multi-stage Dockerfile for building and serving Angular app (to be created)
- `frontend/.dockerignore` - Docker ignore file to optimize build (to be created)
- `frontend/nginx.conf` - Nginx configuration for serving Angular SPA (to be created)
- `docker-compose.yml` - Docker Compose configuration, needs frontend service added
- `backend/src/main/java/com/aki/backend/config/CorsConfig.java` - CORS configuration class (to be created)

### Notes

- Angular Material components will be used throughout the UI for consistent design
- The frontend will use Angular's HttpClient for API communication
- Environment files will handle different API base URLs for development vs Docker
- All components will be standalone (Angular 19 style)
- Routing will use Angular's new signal-based routing where applicable
- **All frontend files will include comprehensive TypeScript documentation/comments** to help with learning:
  - TypeScript type annotations and their purpose
  - Angular decorators and what they do
  - Dependency injection explained
  - RxJS Observables and how they work
  - Component lifecycle and Angular patterns
  - Interface/type definitions explained
  - Method signatures and return types
  - Inline comments for complex logic

## Tasks

- [ ] 1.0 Set Up Angular Material and Core Dependencies
  - [ ] 1.1 Install Angular Material and Angular CDK packages: `npm install @angular/material @angular/cdk`
  - [ ] 1.2 Install Angular Animations: `npm install @angular/animations`
  - [ ] 1.3 Run Angular Material setup: `ng add @angular/material` (choose a theme, e.g., Indigo/Pink)
  - [ ] 1.4 Import Angular Material theme in `src/styles.css`: `@import '@angular/material/prebuilt-themes/indigo-pink.css';`
  - [ ] 1.5 Configure Material theme in `app.config.ts` (if needed for custom theme)
  - [ ] 1.6 Verify Material installation by checking if Material styles are applied

- [ ] 2.0 Configure Backend CORS and Environment Setup
  - [ ] 2.1 Create CORS configuration class `CorsConfig.java` in `backend/src/main/java/com/aki/backend/config/`
  - [ ] 2.2 Configure CORS to allow requests from frontend origin (http://localhost:4200 for dev, http://localhost for Docker)
  - [ ] 2.3 Create `frontend/src/environments/environment.ts` with API base URL: `http://localhost:8080`
  - [ ] 2.4 Create `frontend/src/environments/environment.prod.ts` with API base URL: `http://app:8080` (or `http://localhost:8080` depending on CORS setup)
  - [ ] 2.5 Configure Angular to use environment files in `app.config.ts` or `main.ts`
  - [ ] 2.6 Test CORS configuration by making a test HTTP request from frontend

- [ ] 3.0 Implement API Interface Service and Models
  - [ ] 3.1 Create `frontend/src/app/models/api-interface.model.ts` with interface matching backend `ApiInterfaceEntity` - **Include TypeScript documentation explaining interfaces, types, optional properties**
  - [ ] 3.2 Create `frontend/src/app/models/api-endpoint.model.ts` with interface matching backend `ApiEndpointEntity` - **Include TypeScript documentation**
  - [ ] 3.3 Update `api-interface.service.ts` to import HttpClient and inject it in constructor - **Document dependency injection and service pattern**
  - [ ] 3.4 Implement `getAllInterfaces()` method that calls `GET /api/interfaces` - **Document Observable, HTTP methods, generics**
  - [ ] 3.5 Implement `getInterfaceById(id: number)` method that calls `GET /api/interfaces/{id}` - **Document method parameters, return types**
  - [ ] 3.6 Implement `createInterface(apiInterface: ApiInterface)` method that calls `POST /api/interfaces` - **Document POST requests, request bodies**
  - [ ] 3.7 Implement `updateInterface(id: number, apiInterface: ApiInterface)` method that calls `PUT /api/interfaces/{id}` - **Document PUT requests**
  - [ ] 3.8 Implement `deleteInterface(id: number)` method that calls `DELETE /api/interfaces/{id}` - **Document DELETE requests**
  - [ ] 3.9 Implement `getEndpointsByApiId(apiId: number)` method that calls `GET /api/interfaces/{id}/endpoints` - **Document nested routes**
  - [ ] 3.10 Add error handling using RxJS operators (catchError) in service methods - **Document RxJS operators, error handling patterns**
  - [ ] 3.11 Return Observables with proper typing from all service methods - **Document generic types, Observable<T> pattern**

- [ ] 4.0 Create API Interface Management Components (List, Detail, Form)
  - [ ] 4.1 Generate `api-interface-list` component: `ng generate component components/api-interface-list --standalone` - **Document @Component decorator, standalone components**
  - [ ] 4.2 Implement API interface list component with Material table or card layout - **Document component class structure, lifecycle hooks**
  - [ ] 4.3 Add "Create New" button using Material button component - **Document template syntax, event binding**
  - [ ] 4.4 Display API interfaces in a responsive grid/list using Material cards or table - **Document *ngFor directive, property binding**
  - [ ] 4.5 Add view/edit/delete action buttons for each API interface - **Document click event handlers, method calls**
  - [ ] 4.6 Generate `api-interface-detail` component: `ng generate component components/api-interface-detail --standalone` - **Document component structure**
  - [ ] 4.7 Implement API interface detail view showing all fields (name, type, base URL, description, etc.) - **Document property interpolation {{ }}**
  - [ ] 4.8 Display associated endpoints in the detail view - **Document nested data display**
  - [ ] 4.9 Add edit and delete buttons in detail view - **Document button actions**
  - [ ] 4.10 Generate `api-interface-form` component: `ng generate component components/api-interface-form --standalone` - **Document form components**
  - [ ] 4.11 Create reactive form with Material form fields for all API interface properties - **Document ReactiveFormsModule, FormBuilder, FormGroup, FormControl**
  - [ ] 4.12 Add form validation (required fields, URL validation for base URL) - **Document validators, validation patterns**
  - [ ] 4.13 Implement form submission to create or update API interface - **Document form submission, preventDefault**
  - [ ] 4.14 Pre-populate form fields when editing existing interface - **Document form.patchValue(), ngOnInit lifecycle**
  - [ ] 4.15 Add navigation back to list after successful create/update - **Document Router service, navigation methods**
  - [ ] 4.16 Implement delete confirmation dialog using Material Dialog component - **Document MatDialog, dialog service, async/await**

- [ ] 5.0 Create Endpoint Management Components
  - [ ] 5.1 Generate `endpoint-list` component: `ng generate component components/endpoint-list --standalone` - **Document component creation**
  - [ ] 5.2 Display endpoints in a table or list format within API detail view - **Document data display patterns**
  - [ ] 5.3 Show endpoint details: HTTP method, path, description, active status - **Document template data binding**
  - [ ] 5.4 Add "Add Endpoint" button to create new endpoints - **Document event handling**
  - [ ] 5.5 Generate `endpoint-form` component: `ng generate component components/endpoint-form --standalone` - **Document form components**
  - [ ] 5.6 Create reactive form with Material form fields for endpoint properties - **Document Material form controls**
  - [ ] 5.7 Add HTTP method dropdown/select (GET, POST, PUT, DELETE, PATCH, etc.) - **Document MatSelect, option binding**
  - [ ] 5.8 Add path input field with validation - **Document input validation**
  - [ ] 5.9 Add description textarea - **Document textarea controls**
  - [ ] 5.10 Add request/response example JSON textareas with syntax highlighting (optional) - **Document textarea for JSON**
  - [ ] 5.11 Add active status checkbox - **Document MatCheckbox, boolean form controls**
  - [ ] 5.12 Implement form submission to create or update endpoint - **Document form submission patterns**
  - [ ] 5.13 Pre-populate form when editing existing endpoint - **Document form initialization**
  - [ ] 5.14 Implement delete confirmation dialog for endpoints - **Document dialog patterns**
  - [ ] 5.15 Ensure endpoint form associates endpoint with correct API interface - **Document parent-child component communication**

- [ ] 6.0 Implement Search and Filter Functionality
  - [ ] 6.1 Add search input field in API interface list component using Material input - **Document MatInput, two-way binding with [(ngModel)] or formControl**
  - [ ] 6.2 Implement filtering logic to filter by name, type, or description - **Document array filter() method, TypeScript array operations**
  - [ ] 6.3 Use RxJS operators (debounceTime, distinctUntilChanged) for search input - **Document RxJS pipe(), operators, Subject/BehaviorSubject**
  - [ ] 6.4 Add filter chips or dropdown for filtering by API type (REST, SOAP, GraphQL, etc.) - **Document MatChips or MatSelect**
  - [ ] 6.5 Display filtered results dynamically as user types - **Document reactive programming, change detection**
  - [ ] 6.6 Show "No results found" message when filter returns empty - **Document *ngIf directive, conditional rendering**
  - [ ] 6.7 Clear search functionality - **Document method implementation, reset patterns**

- [ ] 7.0 Set Up Routing and Navigation
  - [ ] 7.1 Configure routes in `app.routes.ts` - **Document Routes type, route configuration, path parameters**
    - `/` - API interface list component
    - `/api-interfaces/:id` - API interface detail component - **Document route parameters**
    - `/api-interfaces/new` - API interface form (create mode)
    - `/api-interfaces/:id/edit` - API interface form (edit mode)
  - [ ] 7.2 Update `app.component.html` to include router outlet and navigation header - **Document <router-outlet> directive**
  - [ ] 7.3 Create navigation header with app title and "API Interfaces" link - **Document navigation structure**
  - [ ] 7.4 Add Material toolbar for header with navigation - **Document MatToolbar**
  - [ ] 7.5 Implement navigation using Angular Router (routerLink directives) - **Document [routerLink] directive, routerLinkActive**
  - [ ] 7.6 Add navigation from list to detail view (click on API interface) - **Document programmatic navigation with Router.navigate()**
  - [ ] 7.7 Add navigation from detail to edit form - **Document navigation patterns**
  - [ ] 7.8 Add back button in detail and form views - **Document browser history, location.back() or Router**
  - [ ] 7.9 Handle route parameters (id) correctly in detail and edit components - **Document ActivatedRoute, paramMap, snapshot vs observable**

- [ ] 8.0 Create Dockerfile for Frontend (Multi-stage Build with nginx)
  - [ ] 8.1 Create `frontend/Dockerfile` with multi-stage build:
    - Stage 1: Use Node.js image, copy package files, install dependencies, build Angular app
    - Stage 2: Use nginx image, copy built files from stage 1, configure nginx
  - [ ] 8.2 Create `frontend/.dockerignore` to exclude node_modules, .angular, and other unnecessary files
  - [ ] 8.3 Create `frontend/nginx.conf` with configuration to:
    - Serve static files from `/usr/share/nginx/html`
    - Handle Angular routing (try_files directive for SPA)
    - Enable gzip compression
    - Set appropriate cache headers
  - [ ] 8.4 Update Dockerfile to copy nginx.conf to container
  - [ ] 8.5 Build Angular app in production mode (`ng build --configuration production`)
  - [ ] 8.6 Expose port 80 in Dockerfile
  - [ ] 8.7 Test Docker build locally: `docker build -t mini-api-hub-frontend ./frontend`

- [ ] 9.0 Integrate Frontend into Docker Compose
  - [ ] 9.1 Add `frontend` service to `docker-compose.yml`
  - [ ] 9.2 Configure frontend service to build from `frontend/Dockerfile`
  - [ ] 9.3 Set build context to `frontend/` directory
  - [ ] 9.4 Expose frontend on port 80 (map host port 4200 or 80 to container port 80)
  - [ ] 9.5 Add dependency on `app` (backend) service using `depends_on`
  - [ ] 9.6 Connect frontend service to `mini-net` network
  - [ ] 9.7 Update environment configuration to use correct API URL for Docker (consider using service name or localhost)
  - [ ] 9.8 Test full stack: `docker-compose up --build` should start all three services
  - [ ] 9.9 Verify frontend is accessible at http://localhost (or configured port)
  - [ ] 9.10 Verify frontend can communicate with backend API without CORS errors
  - [ ] 9.11 Test all CRUD operations from frontend to ensure end-to-end functionality

