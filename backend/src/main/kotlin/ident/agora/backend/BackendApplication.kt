package ident.agora.backend

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@SpringBootApplication
class BackendApplication {

	@Bean
	fun corsFilter(): CorsFilter {
		val config = CorsConfiguration().apply {
			allowCredentials = true
			addAllowedOrigin("http://localhost:3000")
			addAllowedHeader("*")
			addAllowedMethod("*")
		}

		val source = UrlBasedCorsConfigurationSource()
		source.registerCorsConfiguration("/**", config)

		return CorsFilter(source)
	}

	@Bean
	fun objectMapper(): ObjectMapper {
		return ObjectMapper().registerKotlinModule()
	}
}

fun main(args: Array<String>) {
	runApplication<BackendApplication>(*args)
}