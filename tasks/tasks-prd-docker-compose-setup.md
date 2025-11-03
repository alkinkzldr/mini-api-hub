# Task List: Docker Compose Setup for Backend and Database

Based on: `prd-docker-compose-setup.md`

## Relevant Files

- `Dockerfile` - Multi-stage Docker build file for building and running the Spring Boot backend application
- `docker-compose.yml` - Docker Compose configuration for orchestrating database and backend services
- `backend/pom.xml` - Maven project configuration file, needs Java version alignment and DevTools dependency
- `backend/src/main/resources/application.properties` - Spring Boot configuration, already has correct database connection settings
- `docker-compose.dev.yml` - Optional development override file for hot reload volume mounts (may be created)

### Notes

- The Dockerfile currently expects files in root but they're in the `backend/` directory
- Java version mismatch: pom.xml specifies Java 25, but Dockerfile uses Java 17 - will align to Java 21 (LTS) which is compatible with Spring Boot 3.5.7
- Spring Boot DevTools will be added to pom.xml for hot reload support
- Health checks will ensure database is ready before backend starts

## Tasks

- [x] 1.0 Fix Dockerfile to Build from Backend Directory Structure
  - [x] 1.1 Update Dockerfile COPY commands to reference `backend/pom.xml` instead of `pom.xml` (line 3)
  - [x] 1.2 Update Dockerfile COPY command to reference `backend/src` instead of `src` (line 4)
  - [x] 1.3 Verify the build context in docker-compose.yml is set to root directory (should remain `.`)
  - [x] 1.4 Test that the Dockerfile can successfully copy files from the backend directory

- [x] 2.0 Align Java Versions Between pom.xml and Dockerfile
  - [x] 2.1 Research and confirm Java 21 (LTS) compatibility with Spring Boot 3.5.7
  - [x] 2.2 Update pom.xml `<java.version>` property from 25 to 21
  - [x] 2.3 Update Dockerfile build stage to use `maven:3.9-eclipse-temurin-21` instead of `maven:3.9-eclipse-temurin-17`
  - [x] 2.4 Update Dockerfile runtime stage to use `eclipse-temurin:21-jre` instead of `eclipse-temurin:17-jre`
  - [x] 2.5 Verify Java version compatibility across all dependencies (Spring Boot, Lombok, PostgreSQL driver)

- [x] 3.0 Update docker-compose.yml with Proper Build Context and Health Checks
  - [x] 3.1 Verify build context is set correctly in docker-compose.yml (should be `.` for root directory)
  - [x] 3.2 Add healthcheck configuration to the `db` service using `pg_isready` command
  - [x] 3.3 Update `app` service `depends_on` to use healthcheck condition: `depends_on: db: { condition: service_healthy }`
  - [x] 3.4 Verify that environment variables for database connection are properly set (already configured, but verify)

- [x] 4.0 Configure Database Health Check and Startup Dependencies
  - [x] 4.1 Verify PostgreSQL healthcheck command: `pg_isready -U miniuser -d miniapihub`
  - [x] 4.2 Set appropriate healthcheck interval, timeout, and retries (e.g., interval: 5s, timeout: 5s, retries: 5)
  - [x] 4.3 Verify Spring Boot application.properties has correct connection retry settings or add if needed
  - [x] 4.4 Test that backend waits for database to be healthy before attempting connection

- [x] 5.0 Add Development Hot Reload Support with Spring Boot DevTools
  - [x] 5.1 Add `spring-boot-devtools` dependency to `backend/pom.xml` with appropriate scope (provided)
  - [x] 5.2 Configure Spring Boot DevTools to exclude unnecessary auto-restart triggers in application.properties (optional)
  - [x] 5.3 Test that DevTools is included in the build and container starts with DevTools enabled
  - [x] 5.4 Document hot reload usage: code changes will require container restart (or use volume mounts for advanced setup)

