package ident.agora.backend.controller

import ident.agora.backend.entities.RegisterRequest
import ident.agora.backend.entities.UserResponse
import ident.agora.backend.services.UserService
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
    fun register(@RequestBody request: RegisterRequest): ResponseEntity<UserResponse> {
        return try {
            logger.info("Registration attempt for email: ${request.email}")
            val user = userService.registerUser(request.email, request.username, request.password)
            ResponseEntity.ok(UserResponse.from(user))
        } catch (e: Exception) {
            logger.error("Registration failed", e)
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping("/me")
    fun getCurrentUser(@RequestHeader("X-Keycloak-User-Id") keycloakId: String): ResponseEntity<UserResponse> {
        return userService.findByKeycloakId(keycloakId)
            .map { UserResponse.from(it) }
            .map { ResponseEntity.ok(it) }
            .orElse(ResponseEntity.notFound().build())
    }
}