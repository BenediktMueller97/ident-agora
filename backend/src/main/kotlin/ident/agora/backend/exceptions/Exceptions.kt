package ident.agora.backend.exceptions

import org.springframework.http.HttpStatus

sealed class ApiException(
    override val message: String,
    val httpStatus: HttpStatus
) : RuntimeException(message)

// User-related exceptions
class UserAlreadyExistsException(email: String) :
    ApiException("User with email '$email' already exists", HttpStatus.CONFLICT)

class UserNotFoundException(identifier: String) :
    ApiException("User not found: $identifier", HttpStatus.NOT_FOUND)

class UserNotVerifiedException(userId: String) :
    ApiException("User '$userId' must be verified before this operation", HttpStatus.BAD_REQUEST)

// External service exceptions
class KeycloakException(message: String, cause: Throwable? = null) :
    ApiException("Keycloak error: $message", HttpStatus.SERVICE_UNAVAILABLE) {
    init {
        cause?.let { initCause(it) }
    }
}

class WaltIdException(message: String, cause: Throwable? = null) :
    ApiException("Walt.id error: $message", HttpStatus.SERVICE_UNAVAILABLE) {
    init {
        cause?.let { initCause(it) }
    }
}

// Credential exceptions
class CredentialIssuanceException(reason: String) :
    ApiException("Failed to issue credential: $reason", HttpStatus.INTERNAL_SERVER_ERROR)

class DIDCreationException(username: String) :
    ApiException("Failed to create DID for user: $username", HttpStatus.INTERNAL_SERVER_ERROR)

// Validation exceptions
class ValidationException(message: String) :
    ApiException(message, HttpStatus.BAD_REQUEST)
