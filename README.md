# Mini API Hub

A full-stack application for testing and experimenting with various public APIs.

## Tech Stack

- **Frontend**: Angular 19 with Angular Material
- **Backend**: Spring Boot 3.5 (Java 21)
- **Database**: PostgreSQL 16

## Getting Started

### Prerequisites

- Java 21
- Node.js 18+
- Docker & Docker Compose (optional)

### Running with Docker

```bash
docker compose up
```

This starts:
- PostgreSQL on port 5432
- Backend API on port 8080
- Frontend on port 80

### Running Locally

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

The frontend dev server runs on `http://localhost:4200`.
