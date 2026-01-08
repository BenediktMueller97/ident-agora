package ident.agora.backend.entities

import jakarta.validation.constraints.NotBlank
import java.time.LocalDateTime

data class VerificationRequest(
    @field:NotBlank(message = "User ID is required")
    val userId: String,

    @field:NotBlank(message = "Verification type is required")
    val verificationType: String
)

data class VerificationStatusResponse(
    val status: String,
    val verifiedAt: LocalDateTime?,
    val hasVC: Boolean
)