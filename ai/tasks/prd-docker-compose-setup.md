# PRD: Docker Compose Setup for Backend and Database

## Introduction/Overview

This feature will enable running the Spring Boot backend application and PostgreSQL database entirely through Docker using Docker Compose. Currently, there are issues with the Dockerfile not matching the project structure (backend files are in `/backend` directory, but Dockerfile expects them in root), and the setup needs to be configured so that a single `docker-compose build` command can build and run both the Maven project and the database together.

The goal is to create a fully containerized development environment that is easy to set up and run with minimal configuration, allowing developers to work on the backend without needing to manually install and configure PostgreSQL, Java, or Maven on their local machine.

## Goals

1. Fix Dockerfile to correctly build the Maven project from the `/backend` directory structure
2. Ensure Docker Compose can build the backend service using a multi-stage Docker build that compiles the Maven project inside the container
3. Configure proper service dependencies so the database starts before the backend
4. Ensure the backend can successfully connect to the PostgreSQL database container
5. Expose the backend API on port 8080 and database on port 5432 for local development access
6. Enable hot reload/watch mode for development workflow
7. Provide a single-command workflow (`docker-compose up`) to start everything

## User Stories

1. **As a developer**, I want to run `docker-compose build` so that I can build both the backend application and prepare the database container without manual steps.

2. **As a developer**, I want to run `docker-compose up` so that I can start the database and backend application together with a single command.

3. **As a developer**, I want the backend to automatically wait for the database to be ready before starting, so that I don't encounter connection errors during startup.

4. **As a developer**, I want to access the backend API at `http://localhost:8080` and connect to the database at `localhost:5432`, so that I can test the application and debug using standard database tools.

5. **As a developer**, I want changes to my Java code to automatically reload in the development container, so that I can iterate quickly without rebuilding the Docker image.

## Functional Requirements

1. The Dockerfile must be updated to correctly reference the `/backend` directory where `pom.xml` and source files are located.

2. The Dockerfile must use a multi-stage build that:
   - Uses Maven 3.9 with Eclipse Temurin 17 JDK for the build stage
   - Copies `backend/pom.xml` and `backend/src` into the container
   - Runs `mvn clean package` to build the Spring Boot JAR
   - Uses Eclipse Temurin 17 JRE for the runtime stage
   - Copies the built JAR into the final image

3. The `docker-compose.yml` must include:
   - A `db` service running PostgreSQL 16
   - An `app` service that builds from the Dockerfile
   - Proper networking between services
   - Volume persistence for database data

4. The `app` service must depend on the `db` service using `depends_on` directive.

5. The backend application must be configured to connect to the database using the service name `db` as the hostname (e.g., `jdbc:postgresql://db:5432/miniapihub`).

6. Environment variables must be passed from docker-compose to the backend container for database connection (URL, username, password).

7. Port mapping must expose:
   - Backend API on host port 8080 → container port 8080
   - Database on host port 5432 → container port 5432

8. The Docker Compose setup must support development workflow with hot reload capabilities (e.g., using Spring Boot DevTools or volume mounts for code changes).

9. The setup must ensure the database is fully initialized and ready to accept connections before the backend attempts to connect.

10. The build process must skip tests during Docker build (`-DskipTests`) to speed up development builds, but this should be configurable.

## Non-Goals (Out of Scope)

1. **Frontend Docker setup** - This PRD is focused only on backend and database containerization.

2. **Production deployment configurations** - This is for development use only. Production deployment concerns (security hardening, resource limits, secrets management, etc.) are out of scope.

3. **CI/CD pipeline integration** - While the Docker setup may be used in CI/CD later, that integration is not part of this feature.

4. **Multiple environment configurations** - Dev/staging/prod environment variations are not included.

5. **Database migration tooling** - Flyway, Liquibase, or other migration tools setup is not included (though they may work with this setup).

6. **Backup/restore functionality** - Database backup and restore procedures are out of scope.

7. **Health check endpoints** - While Spring Boot Actuator may be useful, explicit health check configuration is not required.

## Design Considerations

1. **Dockerfile Location**: The Dockerfile should remain in the project root for docker-compose to find it, but it must be configured to build from the `backend/` subdirectory.

2. **Maven Build Context**: When building, the Dockerfile needs access to `backend/pom.xml` and `backend/src/`. This can be achieved by either:
   - Changing the build context in docker-compose.yml to `backend/` directory, or
   - Adjusting COPY paths in Dockerfile to reference `backend/` from the root context

3. **Development Hot Reload**: Consider using Spring Boot DevTools with volume mounts, or using Maven's continuous compilation mode. However, this may require a separate docker-compose override file for development.

4. **Database Initialization**: PostgreSQL container handles initialization automatically, but ensure the backend waits long enough for the database to be ready (consider using healthchecks or wait scripts).

5. **Network Isolation**: Services should communicate via Docker's internal network (`mini-net` as currently configured).

## Technical Considerations

1. **Build Context**: The Docker Compose build context needs to be set correctly. Currently, the Dockerfile is in root but references files that are in `backend/`. Options:
   - Set build context to root and update Dockerfile COPY paths to `backend/pom.xml` and `backend/src`
   - Move Dockerfile to `backend/` and update docker-compose.yml build context
   - Keep Dockerfile in root, set context to root, and adjust paths

2. **Java Version Compatibility**: The pom.xml specifies Java 25, but the Dockerfile uses Java 17. These need to be aligned (either update Dockerfile to use Java 25 or update pom.xml to use Java 17, or verify compatibility).

3. **Spring Boot Configuration**: The `application.properties` already has database connection configured for Docker (`jdbc:postgresql://db:5432/miniapihub`), which is correct. Environment variables in docker-compose.yml should override these if needed.

4. **Maven Wrapper**: The project includes `mvnw` and `mvnw.cmd`, but the Dockerfile uses a Maven image directly, which is appropriate for containerized builds.

5. **Dependencies**: The backend depends on PostgreSQL, Spring Boot Web, Spring Data JPA, and Lombok. Ensure all are compatible with the Java version chosen.

6. **Container Startup Order**: Use `depends_on` with a healthcheck or wait condition to ensure database is ready before backend starts. Spring Boot's default retry logic may help, but explicit waiting is better.

7. **Development Hot Reload**: For development, consider:
   - Volume mounting the `backend/src` directory
   - Using Spring Boot DevTools
   - Or running Maven in continuous mode inside the container
   However, full hot reload in containers can be complex and may be a follow-up task.

## Success Metrics

1. **Build Success**: Running `docker-compose build` completes without errors and produces a working backend image.

2. **Service Startup**: Running `docker-compose up` starts both database and backend containers successfully.

3. **Database Connection**: The backend application logs show successful database connection on startup (no connection errors).

4. **API Accessibility**: The backend API is accessible at `http://localhost:8080` (e.g., health endpoint or root endpoint returns a response).

5. **Database Accessibility**: The database is accessible from the host machine at `localhost:5432` using connection credentials (miniuser/minipass).

6. **Container Health**: Both containers remain running and healthy (no crashes or restart loops).

7. **Single Command Workflow**: Developer can run `docker-compose up` and have a fully working environment without manual intervention.

## Open Questions

1. Should we implement hot reload/watch mode now, or defer it to a future enhancement? (Given answer 5a indicates development with hot reload is desired, but we should clarify if it's a must-have for initial implementation)

2. What Java version should we target? The pom.xml says Java 25 but Dockerfile uses Java 17. Should we use Java 17, 21 (LTS), or 25?

3. Should we add explicit health checks to the docker-compose.yml services to better handle startup dependencies?

4. Do we need separate docker-compose files for development vs. a base setup (e.g., `docker-compose.yml` and `docker-compose.dev.yml`)?

5. Should the Dockerfile support both building from source AND running a pre-built JAR (for cases where developer builds locally first)?

