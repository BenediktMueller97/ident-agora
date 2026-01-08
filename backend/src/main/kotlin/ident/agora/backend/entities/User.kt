package ident.agora.backend.entities

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "users")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    var id: String? = null,

    @Column(unique = true, nullable = false)
    var keycloakId: String,

    @Column(unique = true, nullable = false)
    var email: String,

    @Column(nullable = false)
    var username: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var verificationStatus: VerificationStatus = VerificationStatus.UNVERIFIED,

    @Column
    var did: String? = null,

    @Column
    var vcCredentialId: String? = null,

    @Column
    var verifiedAt: LocalDateTime? = null,

    @Column
    var verificationMethod: String? = null,

    @Column(nullable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),

    @Column
    var updatedAt: LocalDateTime? = null
) {
    enum class VerificationStatus {
        UNVERIFIED,
        PENDING,
        VERIFIED,
        REJECTED,
        VC_ISSUED
    }

    @PrePersist
    fun onCreate() {
        createdAt = LocalDateTime.now()
    }

    @PreUpdate
    fun onUpdate() {
        updatedAt = LocalDateTime.now()
    }
}