package com.aki.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aki.backend.entity.ApiEndpointEntity;
import com.aki.backend.entity.ApiInterfaceEntity;
import com.aki.backend.service.ApiInterfaceService;

@RestController
@RequestMapping("/api/interfaces")
public class ApiInterfaceController {
    
    private final ApiInterfaceService service;
    
    @Autowired
    public ApiInterfaceController(ApiInterfaceService service) {
        this.service = service;
    }
    
    @GetMapping
    public ResponseEntity<List<ApiInterfaceEntity>> getAllInterfaces() {
        return ResponseEntity.ok(service.getAllInterfaces());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiInterfaceEntity> getInterfaceById(@PathVariable Long id) {
        ApiInterfaceEntity apiInterface = service.getInterfaceById(id);
        if (apiInterface != null) {
            return ResponseEntity.ok(apiInterface);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/name/{name}")
    public ResponseEntity<ApiInterfaceEntity> getInterfaceByName(@PathVariable String name) {
        ApiInterfaceEntity apiInterface = service.getInterfaceByName(name);
        if (apiInterface != null) {
            return ResponseEntity.ok(apiInterface);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/{id}/endpoints")
    public ResponseEntity<List<ApiEndpointEntity>> getEndpointsByApiId(@PathVariable Long id) {
        return ResponseEntity.ok(service.getEndpointsByApiId(id));
    }
    
    @PostMapping
    public ResponseEntity<ApiInterfaceEntity> createInterface(@RequestBody ApiInterfaceEntity apiInterface) {
        try {
            ApiInterfaceEntity created = service.createApiInterface(apiInterface);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ApiInterfaceEntity> updateInterface(
            @PathVariable Long id, 
            @RequestBody ApiInterfaceEntity apiInterface) {
        try {
            ApiInterfaceEntity updated = service.updateApiInterface(id, apiInterface);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterface(@PathVariable Long id) {
        try {
            service.deleteApiInterface(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @GetMapping("/large")
    public ResponseEntity<List<ApiInterfaceEntity>> getLargeInterfaces() {
        return ResponseEntity.ok(service.getLargeInterfaces());
    }
}
