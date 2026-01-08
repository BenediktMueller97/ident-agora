package ident.agora.backend.entities

import ident.agora.backend.entities.User
import java.time.LocalDateTime

data class RegisterRequest(
    val email: String,
    val username: String,
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