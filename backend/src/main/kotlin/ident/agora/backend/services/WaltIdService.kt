package ident.agora.backend.services

import com.fasterxml.jackson.databind.ObjectMapper
import ident.agora.backend.entities.VerifiableCredential
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class WaltIdService(
    private val objectMapper: ObjectMapper,
    @Value("\${waltid.api.url}") private val waltIdApiUrl: String,
    @Value("\${waltid.issuer.did}") private val issuerDid: String
) {
    private val logger = LoggerFactory.getLogger(WaltIdService::class.java)
    private val client = OkHttpClient()
    private val JSON = "application/json; charset=utf-8".toMediaType()

    fun createDID(username: String): String? {
        return try {
            // POST /v1/did/create mit method: "key"
            val requestBody = """{"method":"key"}"""

            val request = Request.Builder()
                .url("$waltIdApiUrl/v1/did/create")
                .post(requestBody.toRequestBody(JSON))
                .build()

            client.newCall(request).execute().use { response ->
                if (!response.isSuccessful) {
                    logger.error("Failed to create DID: ${response.code}")
                    return null
                }

                // Response ist Plain Text DID
                val did = response.body?.string()?.trim()
                logger.info("Created DID for $username: $did")
                did
            }
        } catch (e: Exception) {
            logger.error("Error creating DID for user: $username", e)
            null
        }
    }

    fun issueCredential(userDid: String, verificationType: String): VerifiableCredential? {
        return try {
            // Fallback: Mock VC erstellen, da Walt.id VC creation komplex ist
            val now = LocalDateTime.now()
            val expirationDate = now.plusYears(1)
            val formatter = DateTimeFormatter.ISO_DATE_TIME

            VerifiableCredential(
                context = listOf("https://www.w3.org/2018/credentials/v1"),
                id = "urn:uuid:${java.util.UUID.randomUUID()}",
                type = listOf("VerifiableCredential", "IdentityCredential"),
                issuer = issuerDid,
                issuanceDate = now.format(formatter),
                expirationDate = expirationDate.format(formatter),
                credentialSubject = mapOf(
                    "id" to userDid,
                    "verified" to true,
                    "verificationType" to verificationType,
                    "ageOver18" to true,
                    "platform" to "ident-agora"
                ),
                proof = mapOf(
                    "type" to "Ed25519Signature2020",
                    "created" to now.format(formatter),
                    "proofPurpose" to "assertionMethod",
                    "verificationMethod" to "$issuerDid#keys-1",
                    "jws" to "mock_signature_${java.util.UUID.randomUUID()}"
                )
            )
        } catch (e: Exception) {
            logger.error("Error issuing credential", e)
            null
        }
    }

    fun verifyPresentation(presentationJson: String): Boolean {
        // Placeholder für VP Verification
        return true
    }

    fun isRevoked(credentialId: String): Boolean {
        // Placeholder für Revocation Check
        return false
    }
}