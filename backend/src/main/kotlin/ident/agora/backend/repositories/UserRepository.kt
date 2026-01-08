package ident.agora.backend.repositories

import ident.agora.backend.entities.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : JpaRepository<User, String> {
    fun findByKeycloakId(keycloakId: String): Optional<User>
    fun findByEmail(email: String): Optional<User>
    fun findByDid(did: String): Optional<User>
    fun existsByEmail(email: String): Boolean
}