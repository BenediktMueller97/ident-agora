package ident.agora.backend.controllers

import ident.agora.backend.entities.VCIssueRequest
import ident.agora.backend.entities.VCResponse
import ident.agora.backend.entities.VerifyPresentationRequest
import ident.agora.backend.entities.VerifyResponse
import ident.agora.backend.services.UserService
import ident.agora.backend.services.WaltIdService
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/vc")
class VCController(
    private val userService: UserService,
    private val waltIdService: WaltIdService
) {
    private val logger = LoggerFactory.getLogger(VCController::class.java)

    @PostMapping("/issue")
    fun issueCredential(@RequestBody request: VCIssueRequest): ResponseEntity<VCResponse> {
        return try {
            logger.info("Issuing VC for user: ${request.userId}")
            val vc = userService.issueVerifiableCredential(request.userId)
            ResponseEntity.ok(VCResponse.from(vc))
        } catch (e: Exception) {
            logger.error("Failed to issue VC", e)
            ResponseEntity.badRequest().build()
        }
    }

    @PostMapping("/verify")
    fun verifyPresentation(@RequestBody request: VerifyPresentationRequest): ResponseEntity<VerifyResponse> {
        return try {
            logger.info("Verifying presentation")
            val valid = waltIdService.verifyPresentation(request.presentationJson)
            ResponseEntity.ok(VerifyResponse(valid))
        } catch (e: Exception) {
            logger.error("Failed to verify presentation", e)
            ResponseEntity.ok(VerifyResponse(false))
        }
    }
}