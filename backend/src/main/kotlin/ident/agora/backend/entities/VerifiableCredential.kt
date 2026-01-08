package ident.agora.backend.entities

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime

data class VerifiableCredential(
    @JsonProperty("@context")
    val context: List<String>,
    val id: String,
    val type: List<String>,
    val issuer: String,
    val issuanceDate: String,
    val expirationDate: String?,
    val credentialSubject: Map<String, Any>,  // ✅ Map statt CredentialSubject
    val proof: Map<String, Any>?               // ✅ Map statt Proof, nullable
) {
    data class CredentialSubject(
        val id: String,
        val verified: Boolean,
        val verificationType: String,
        val ageOver18: Boolean,
        val platform: String
    )

    data class Proof(
        val type: String,
        val created: LocalDateTime,
        val proofPurpose: String,
        val verificationMethod: String,
        val jws: String
    )
}