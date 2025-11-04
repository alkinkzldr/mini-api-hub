# PRD: Frontend API Management Interface

## Introduction/Overview

This feature will create a comprehensive frontend web application using Angular and Angular Material that allows developers to manage their API collection. The frontend will provide a user-friendly interface for viewing, creating, editing, and deleting API interfaces and their associated endpoints. The application will be containerized with Docker using nginx to serve the built Angular application, and will communicate with the backend API via CORS-enabled REST calls.

The goal is to provide developers with a simple, intuitive interface to manage their API hub without requiring complex authentication or advanced features, keeping the focus on core CRUD operations for APIs and endpoints.

## Goals

1. Create a modern, responsive Angular frontend with Angular Material UI components
2. Implement full CRUD operations for API interfaces (list, view, create, edit, delete)
3. Implement full CRUD operations for API endpoints (list, view, create, edit, delete)
4. Add search and filter capabilities for API interfaces
5. Integrate frontend with existing backend API via HTTP client
6. Configure CORS on backend to allow frontend requests
7. Containerize frontend application with Docker using nginx
8. Update docker-compose.yml to include frontend service alongside backend and database
9. Ensure all services can run together with a single `docker-compose up` command

## User Stories

1. **As a developer**, I want to view a list of all API interfaces, so that I can see what APIs are available in my collection.

2. **As a developer**, I want to view details of a specific API interface, so that I can see its base URL, description, authentication type, and associated endpoints.

3. **As a developer**, I want to create a new API interface, so that I can add new APIs to my collection with all necessary information.

4. **As a developer**, I want to edit an existing API interface, so that I can update API information when it changes.

5. **As a developer**, I want to delete an API interface, so that I can remove APIs that are no longer needed.

6. **As a developer**, I want to view endpoints for a specific API, so that I can see all available endpoints for that API.

7. **As a developer**, I want to create new endpoints for an API, so that I can document additional endpoints as they become available.

8. **As a developer**, I want to edit existing endpoints, so that I can update endpoint information (path, method, examples, etc.).

9. **As a developer**, I want to delete endpoints, so that I can remove endpoints that are no longer valid.

10. **As a developer**, I want to search and filter API interfaces, so that I can quickly find specific APIs in a large collection.

## Functional Requirements

1. The frontend must display a list of all API interfaces retrieved from the backend `/api/interfaces` endpoint.

2. The frontend must display detailed information about a single API interface when viewing its details page, including:
   - Name, type, base URL, description, authentication type, active status
   - List of associated endpoints

3. The frontend must provide a form to create a new API interface with fields for:
   - Name (required)
   - Type (REST, SOAP, GraphQL, etc.)
   - Base URL (required)
   - Description
   - Authentication type
   - Active status (checkbox)

4. The frontend must provide a form to edit an existing API interface with pre-populated fields.

5. The frontend must allow deletion of API interfaces with confirmation dialog.

6. The frontend must display a list of endpoints for a specific API interface, retrieved from `/api/interfaces/{id}/endpoints`.

7. The frontend must provide a form to create a new endpoint with fields for:
   - HTTP Method (GET, POST, PUT, DELETE, etc.)
   - Path (required)
   - Description
   - Request Example (JSON)
   - Response Example (JSON)
   - Active status (checkbox)

8. The frontend must provide a form to edit an existing endpoint with pre-populated fields.

9. The frontend must allow deletion of endpoints with confirmation dialog.

10. The frontend must provide a search/filter input that allows filtering API interfaces by name, type, or description.

11. The frontend must use Angular Material components for consistent, modern UI (buttons, cards, forms, tables, dialogs, etc.).

12. The frontend must handle HTTP errors gracefully and display user-friendly error messages.

13. The frontend must use Angular's HttpClient to communicate with the backend API.

14. The backend must be configured to allow CORS requests from the frontend origin.

15. The frontend must be built as a production-ready Angular application.

16. The frontend must be containerized using Docker with a multi-stage build:
    - Build stage: Install dependencies and build Angular app
    - Runtime stage: Use nginx to serve static files

17. The docker-compose.yml must include a frontend service that:
    - Builds from the frontend Dockerfile
    - Exposes port 80 (or 4200 for development)
    - Depends on the backend service
    - Is on the same Docker network as backend

18. All services (frontend, backend, database) must start together with `docker-compose up`.

## Non-Goals (Out of Scope)

1. **Authentication/Authorization** - No login, user management, or role-based access control

2. **Advanced Filtering** - No complex filtering options beyond basic search by name/type/description

3. **API Testing/Execution** - No ability to execute API calls or test endpoints from the frontend

4. **Real-time Updates** - No WebSocket or real-time synchronization features

5. **Advanced Search** - No full-text search, fuzzy matching, or complex query builders

6. **Pagination** - For this initial version, assume small datasets (can be added later if needed)

7. **Export/Import** - No ability to export or import API definitions (JSON, YAML, etc.)

8. **Version History** - No tracking of changes or versioning of APIs

9. **API Documentation Generation** - No automatic generation of OpenAPI/Swagger docs from the UI

10. **Responsive Design for Mobile** - Focus on desktop/tablet experience (mobile can be added later)

## Design Considerations

1. **Angular Material Theme**: Use Angular Material's default theme or a simple custom theme for a professional look.

2. **Layout Structure**:
   - Header with application title
   - Main navigation (list view, create button)
   - Content area with cards/tables for data display
   - Forms in dialogs or separate pages for create/edit

3. **Component Structure**:
   - API Interface List Component
   - API Interface Detail Component
   - API Interface Form Component (create/edit)
   - Endpoint List Component
   - Endpoint Form Component (create/edit)
   - Shared components for common UI elements

4. **Routing**:
   - `/` - List of API interfaces
   - `/api-interfaces/:id` - View API interface details
   - `/api-interfaces/new` - Create new API interface
   - `/api-interfaces/:id/edit` - Edit API interface
   - Endpoints can be managed within the API detail view (modals or expandable sections)

5. **Data Flow**:
   - Use Angular services to handle HTTP calls
   - Use RxJS Observables for reactive data handling
   - Implement proper loading states and error handling

## Technical Considerations

1. **Angular Material Setup**: Install and configure `@angular/material` package with required modules (MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, MatDialogModule, MatIconModule, etc.).

2. **HTTP Client Configuration**: 
   - Create environment files for API base URL (`http://localhost:8080` for development, backend service name for Docker)
   - Use Angular's HttpClient with proper error handling

3. **CORS Configuration**: Backend must be updated to allow CORS requests from frontend origin. Spring Boot CORS configuration needed.

4. **Docker Build Strategy**:
   - Multi-stage Dockerfile:
     - Stage 1: Use Node.js image to install dependencies and build Angular app
     - Stage 2: Use nginx image to serve static files from `dist/frontend/browser`
   - Optimize build: use `.dockerignore` to exclude unnecessary files

5. **Docker Compose Integration**:
   - Frontend service should depend on backend service
   - All services on same network (`mini-net`)
   - Frontend exposed on port 80 (or 4200 for dev)
   - Backend remains on port 8080

6. **Environment Configuration**:
   - Development: `http://localhost:8080` for API calls
   - Docker: `http://app:8080` (using service name) or `http://localhost:8080` depending on setup

7. **Build Optimization**: 
   - Production build with AOT compilation
   - Minimize bundle size
   - Enable gzip compression in nginx

8. **Nginx Configuration**: 
   - Basic nginx config to serve Angular app
   - Handle Angular routing (try_files directive for SPA routing)
   - Proxy API requests if needed (optional, can use direct CORS instead)

## Success Metrics

1. **Functionality**: All CRUD operations work correctly for both API interfaces and endpoints
2. **UI/UX**: Interface is intuitive and uses Material Design components consistently
3. **Integration**: Frontend successfully communicates with backend API without CORS errors
4. **Docker**: All three services (frontend, backend, database) start successfully with `docker-compose up`
5. **Build**: Frontend builds successfully in Docker and serves correctly via nginx
6. **User Experience**: Search/filter works correctly, forms validate input, error messages are clear
7. **Performance**: Frontend loads quickly and API calls complete within reasonable time (<2s for typical operations)

## Open Questions

1. Should we use Angular Material's table component or cards for displaying API interfaces list?
2. Should endpoint management be in a separate route or within the API detail view as expandable sections/modals?
3. What should be the default port for frontend in Docker? 80 (standard) or 4200 (Angular dev default)?
4. Should we implement loading spinners/skeletons for better UX during API calls?
5. Do we need form validation beyond HTML5 required attributes? (e.g., URL validation, email validation if needed)

