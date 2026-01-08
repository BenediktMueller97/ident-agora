# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ident-agora is a Spring Boot backend application for identity and verifiable credentials management. It integrates with Keycloak for user authentication and Walt.id for DID/VC operations.

- **Language:** Kotlin
- **Framework:** Spring Boot 4.0.0
- **Java Version:** 21
- **Port:** 8081

## Build Commands

```bash
# Build the project
./gradlew build

# Run tests
./gradlew test

# Run the application
./gradlew bootRun

# Clean build
./gradlew clean

# Build without tests
./gradlew build -x test
```

All Gradle commands should be run from the `backend/` directory.

## Local Development Environment

Start the required services using Docker Compose:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

This starts:
- PostgreSQL (port 5432)
- Keycloak (port 8080, admin credentials: admin/admin)
- Walt.id SSI Kit (port 7100)

## Architecture

The application follows a layered architecture:

```
Controllers → Services → Repositories → Database
     ↓
External Services (Keycloak, Walt.id)
```

### Key Directories

| Path | Purpose |
|------|---------|
| `backend/src/main/kotlin/ident/agora/backend/controllers/` | REST API endpoints |
| `backend/src/main/kotlin/ident/agora/backend/services/` | Business logic and external integrations |
| `backend/src/main/kotlin/ident/agora/backend/repositories/` | JPA data access layer |
| `backend/src/main/kotlin/ident/agora/backend/entities/` | JPA entities and DTOs |

### Services

- **UserService** (`services/UserService.kt`): Orchestrates user lifecycle (registration, verification)
- **KeycloakService** (`services/KeycloakService.kt`): Keycloak admin API integration for user management
- **WaltIdService** (`services/WaltIdService.kt`): DID creation and VC issuance via Walt.id API

### REST API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/me` | GET | Get current user (via X-Keycloak-User-Id header) |
| `/api/verification/verify` | POST | Verify a user |
| `/api/verification/status/{userId}` | GET | Get verification status |
| `/api/vc/issue` | POST | Issue verifiable credential |
| `/api/vc/verify` | POST | Verify presentation |

## Configuration

Main configuration is in `backend/src/main/resources/application.properties`:
- Database: PostgreSQL at localhost:5432/ident_agora
- Keycloak: localhost:8080, realm "ident-agora"
- Walt.id: localhost:7100
- CORS: Allows localhost:3000 (frontend)

## Important Notes

- The application uses stateless security (no sessions, CSRF disabled)
- VCs in WaltIdService currently use mock signatures, not real cryptographic signing
- User identification relies on X-Keycloak-User-Id header
