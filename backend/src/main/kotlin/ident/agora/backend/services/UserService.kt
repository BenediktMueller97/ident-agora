package ident.agora.backend.services

import ident.agora.backend.entities.User
import ident.agora.backend.entities.VerifiableCredential
import ident.agora.backend.exceptions.UserAlreadyExistsException
import ident.agora.backend.exceptions.UserNotFoundException
import ident.agora.backend.exceptions.UserNotVerifiedException
import ident.agora.backend.repositories.UserRepository
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime
import java.util.*

@Service
class UserService(
    private val userRepository: UserRepository,
    private val keycloakService: KeycloakService,
    private val waltIdService: WaltIdService
) {
    private val logger = LoggerFactory.getLogger(UserService::class.java)

    @Transactional
    fun registerUser(email: String, username: String, password: String): User {
        if (userRepository.existsByEmail(email)) {
            throw UserAlreadyExistsException(email)
        }

        val keycloakId = keycloakService.createUser(email, username, password)

        val user = User(
            keycloakId = keycloakId,
            email = email,
            username = username,
            verificationStatus = User.VerificationStatus.UNVERIFIED
        )

        return userRepository.save(user)
    }

    @Transactional
    fun verifyUser(userId: String, verificationType: String): User {
        val user = userRepository.findById(userId)
            .orElseThrow { UserNotFoundException(userId) }

        user.verificationStatus = User.VerificationStatus.VERIFIED
        user.verifiedAt = LocalDateTime.now()
        user.verificationMethod = verificationType

        return userRepository.save(user)
    }

    @Transactional
    fun issueVerifiableCredential(userId: String): VerifiableCredential {
        val user = userRepository.findById(userId)
            .orElseThrow { UserNotFoundException(userId) }

        if (user.verificationStatus != User.VerificationStatus.VERIFIED) {
            throw UserNotVerifiedException(userId)
        }

        if (user.did == null) {
            user.did = waltIdService.createDID(user.username)
        }

        val vc = waltIdService.issueCredential(user.did!!, user.verificationMethod!!)

        user.vcCredentialId = vc.id
        user.verificationStatus = User.VerificationStatus.VC_ISSUED
        userRepository.save(user)

        logger.info("VC issued for user: $userId")
        return vc
    }

    fun findByKeycloakId(keycloakId: String): Optional<User> = userRepository.findByKeycloakId(keycloakId)

    fun findByEmail(email: String): Optional<User> = userRepository.findByEmail(email)

    fun findByDid(did: String): Optional<User> = userRepository.findByDid(did)
}