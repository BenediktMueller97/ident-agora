package ident.agora.backend.services

import jakarta.annotation.PostConstruct
import org.keycloak.admin.client.Keycloak
import org.keycloak.admin.client.KeycloakBuilder
import org.keycloak.representations.idm.CredentialRepresentation
import org.keycloak.representations.idm.UserRepresentation
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class KeycloakService {
    private val logger = LoggerFactory.getLogger(KeycloakService::class.java)

    @Value("\${keycloak.admin.server-url}")
    private lateinit var serverUrl: String

    @Value("\${keycloak.admin.realm}")
    private lateinit var adminRealm: String

    @Value("\${keycloak.admin.username}")
    private lateinit var adminUsername: String

    @Value("\${keycloak.admin.password}")
    private lateinit var adminPassword: String

    @Value("\${keycloak.admin.client-id}")
    private lateinit var adminClientId: String

    @Value("\${keycloak.realm}")
    private lateinit var realm: String

    private lateinit var keycloak: Keycloak

    @PostConstruct
    fun initKeycloak() {
        keycloak = KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm(adminRealm)
            .username(adminUsername)
            .password(adminPassword)
            .clientId(adminClientId)
            .build()

        logger.info("Keycloak admin client initialized")
    }

    fun createUser(email: String, username: String, password: String): String? {
        return try {
            val realmResource = keycloak.realm(realm)
            val usersResource = realmResource.users()

            val user = UserRepresentation().apply {
                isEnabled = true
                this.username = username
                this.email = email
                isEmailVerified = false
                firstName = username
            }

            val response = usersResource.create(user)
            val userId = extractUserId(response)

            if (userId == null) {
                logger.error("Failed to create user in Keycloak")
                return null
            }

            val credential = CredentialRepresentation().apply {
                type = CredentialRepresentation.PASSWORD
                value = password
                isTemporary = false
            }

            usersResource.get(userId).resetPassword(credential)
            logger.info("User created in Keycloak: $userId")
            userId
        } catch (e: Exception) {
            logger.error("Error creating user in Keycloak", e)
            null
        }
    }

    fun getUser(keycloakId: String): UserRepresentation? {
        return try {
            keycloak.realm(realm).users().get(keycloakId).toRepresentation()
        } catch (e: Exception) {
            logger.error("Error getting user from Keycloak", e)
            null
        }
    }

    fun deleteUser(keycloakId: String): Boolean {
        return try {
            keycloak.realm(realm).users().get(keycloakId).remove()
            true
        } catch (e: Exception) {
            logger.error("Error deleting user from Keycloak", e)
            false
        }
    }

    private fun extractUserId(response: jakarta.ws.rs.core.Response): String? {
        val location = response.getHeaderString("Location")
        return location?.split("/")?.lastOrNull()
    }
}