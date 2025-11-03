package com.aki.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Home/Root Controller
 * 
 * Provides a simple root endpoint to avoid Spring Boot's default error page.
 * This is helpful when someone accidentally accesses the backend directly.
 */
@RestController
public class HomeController {

    /**
     * Root endpoint - provides API information
     * 
     * @return JSON response with API information
     */
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Mini API Hub Backend API");
        response.put("version", "1.0.0");
        response.put("endpoints", Map.of(
            "apiInterfaces", "/api/interfaces",
            "documentation", "API endpoints are available at /api/interfaces"
        ));
        return ResponseEntity.ok(response);
    }
}

