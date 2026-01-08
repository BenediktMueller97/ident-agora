package ident.agora.backend.controllers

import ident.agora.backend.entities.UserResponse
import ident.agora.backend.entities.VerificationRequest
import ident.agora.backend.entities.VerificationStatusResponse
import ident.agora.backend.exceptions.UserNotFoundException
import ident.agora.backend.services.UserService
import jakarta.validation.Valid
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/verification")
class VerificationController(
    private val userService: UserService
) {
    private val logger = LoggerFactory.getLogger(VerificationController::class.java)

    @PostMapping("/verify")
    fun verifyUser(@Valid @RequestBody request: VerificationRequest): ResponseEntity<UserResponse> {
        logger.info("Verifying user: ${request.userId}")
        val user = userService.verifyUser(request.userId, request.verificationType)
        return ResponseEntity.ok(UserResponse.from(user))
    }

    @GetMapping("/status/{userId}")
    fun getStatus(@PathVariable userId: String): ResponseEntity<VerificationStatusResponse> {
        val user = userService.findByKeycloakId(userId)
            .orElseThrow { UserNotFoundException(userId) }
        return ResponseEntity.ok(
            VerificationStatusResponse(
                status = user.verificationStatus.toString(),
                verifiedAt = user.verifiedAt,
                hasVC = user.vcCredentialId != null
            )
        )
    }
}