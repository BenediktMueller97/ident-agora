package ident.agora.backend.entities

import java.time.LocalDateTime

data class VerificationRequest(
    val userId: String,
    val verificationType: String
)

data class VerificationStatusResponse(
    val status: String,
    val verifiedAt: LocalDateTime?,
    val hasVC: Boolean
)