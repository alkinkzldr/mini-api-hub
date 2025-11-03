package com.aki.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * CORS (Cross-Origin Resource Sharing) Configuration
 * 
 * This class configures CORS to allow the Angular frontend to make requests
 * to this Spring Boot backend API.
 * 
 * CORS is needed because:
 * - Frontend runs on http://localhost:4200 (or port 80 in Docker)
 * - Backend runs on http://localhost:8080
 * - Browsers block cross-origin requests by default for security
 * 
 * This configuration tells the browser: "It's OK to allow requests from the frontend origin"
 */
@Configuration // Spring annotation: marks this class as a configuration class
public class CorsConfig {

    /**
     * Creates a CORS filter bean that Spring will automatically use
     * 
     * @Bean annotation tells Spring: "When you need a CorsFilter, use this method to create it"
     * Spring will automatically call this method and use the returned object
     */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Allow requests from the frontend origin (development)
        // In development, Angular runs on port 4200
        config.addAllowedOrigin("http://localhost:4200");
        
        // Allow requests from localhost (for Docker production)
        // When frontend is served from nginx on port 80, it can still make requests to backend
        config.addAllowedOrigin("http://localhost");
        config.addAllowedOrigin("http://localhost:80");
        
        // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
        config.addAllowedMethod("*");
        
        // Allow all headers (Content-Type, Authorization, etc.)
        config.addAllowedHeader("*");
        
        // Allow credentials (cookies, authorization headers) if needed in the future
        config.setAllowCredentials(true);
        
        // Register this CORS configuration for all API endpoints (/** means "all paths")
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}

