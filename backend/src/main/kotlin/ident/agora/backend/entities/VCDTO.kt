package ident.agora.backend.entities

import ident.agora.backend.entities.VerifiableCredential
import java.time.LocalDateTime

data class VCIssueRequest(
    val userId: String
)

data class VCResponse(
    val id: String,
    val issuer: String,
    val userDid: String,
    val issuanceDate: String,
    val expirationDate: String?,
    val credential: VerifiableCredential
) {
    companion object {
        fun from(vc: VerifiableCredential) = VCResponse(
            id = vc.id,
            issuer = vc.issuer,
            userDid = vc.credentialSubject["id"] as? String ?: "",  // ✅ Map access
            issuanceDate = vc.issuanceDate,
            expirationDate = vc.expirationDate,
            credential = vc
        )
    }
}

data class VerifyPresentationRequest(
    val presentationJson: String
)

data class VerifyResponse(
    val valid: Boolean
)