package ident.agora.backend.controllers

import ident.agora.backend.entities.UserResponse
import ident.agora.backend.entities.VerificationRequest
import ident.agora.backend.entities.VerificationStatusResponse
import ident.agora.backend.services.UserService
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
    fun verifyUser(@RequestBody request: VerificationRequest): ResponseEntity<UserResponse> {
        return try {
            logger.info("Verifying user: ${request.userId}")
            val user = userService.verifyUser(request.userId, "ID_DOCUMENT")
            ResponseEntity.ok(UserResponse.from(user))
        } catch (e: Exception) {
            
            logger.error("Verification failed", e)
            ResponseEntity.badRequest().build()
        }
    }

    @GetMapping("/status/{userId}")
    fun getStatus(@PathVariable userId: String): ResponseEntity<VerificationStatusResponse> {
        return userService.findByKeycloakId(userId)
            .map { user ->
                VerificationStatusResponse(
                    status = user.verificationStatus.toString(),
                    verifiedAt = user.verifiedAt,
                    hasVC = user.vcCredentialId != null
                )
            }
            .map { ResponseEntity.ok(it) }
            .orElse(ResponseEntity.notFound().build())
    }
}