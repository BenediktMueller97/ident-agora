package ident.agora.backend.controller

import ident.agora.backend.entities.RegisterRequest
import ident.agora.backend.entities.UserResponse
import ident.agora.backend.exceptions.UserNotFoundException
import ident.agora.backend.services.UserService
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userService: UserService
) {
    private val logger = LoggerFactory.getLogger(AuthController::class.java)

    @PostMapping("/register")
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<UserResponse> {
        logger.info("Registration attempt for email: ${request.email}")
        val user = userService.registerUser(request.email, request.username, request.password)
        return ResponseEntity.ok(UserResponse.from(user))
    }

    @GetMapping("/me")
    fun getCurrentUser(@RequestHeader("X-Keycloak-User-Id") keycloakId: String): ResponseEntity<UserResponse> {
        val user = userService.findByKeycloakId(keycloakId)
            .orElseThrow { UserNotFoundException(keycloakId) }
        return ResponseEntity.ok(UserResponse.from(user))
    }
}