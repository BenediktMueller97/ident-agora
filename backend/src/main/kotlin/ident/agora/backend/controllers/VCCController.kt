package ident.agora.backend.controllers

import ident.agora.backend.entities.VCIssueRequest
import ident.agora.backend.entities.VCResponse
import ident.agora.backend.entities.VerifyPresentationRequest
import ident.agora.backend.entities.VerifyResponse
import ident.agora.backend.services.UserService
import ident.agora.backend.services.WaltIdService
import jakarta.validation.Valid
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
    fun issueCredential(@Valid @RequestBody request: VCIssueRequest): ResponseEntity<VCResponse> {
        logger.info("Issuing VC for user: ${request.userId}")
        val vc = userService.issueVerifiableCredential(request.userId)
        return ResponseEntity.ok(VCResponse.from(vc))
    }

    @PostMapping("/verify")
    fun verifyPresentation(@Valid @RequestBody request: VerifyPresentationRequest): ResponseEntity<VerifyResponse> {
        logger.info("Verifying presentation")
        val valid = waltIdService.verifyPresentation(request.presentationJson)
        return ResponseEntity.ok(VerifyResponse(valid))
    }
}