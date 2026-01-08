package ident.agora.backend.entities

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

data class RegisterRequest(
    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Invalid email format")
    val email: String,

    @field:NotBlank(message = "Username is required")
    @field:Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    val username: String,

    @field:NotBlank(message = "Password is required")
    @field:Size(min = 8, message = "Password must be at least 8 characters")
    val password: String
)

data class UserResponse(
    val id: String?,
    val email: String,
    val username: String,
    val verificationStatus: String,
    val did: String?,
    val hasVC: Boolean,
    val verifiedAt: LocalDateTime?,
    val createdAt: LocalDateTime
) {
    companion object {
        fun from(user: User) = UserResponse(
            id = user.id,
            email = user.email,
            username = user.username,
            verificationStatus = user.verificationStatus.toString(),
            did = user.did,
            hasVC = user.vcCredentialId != null,
            verifiedAt = user.verifiedAt,
            createdAt = user.createdAt
        )
    }
}