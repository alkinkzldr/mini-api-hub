package com.aki.backend.entities;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

/*
 * Represents an API Interface entity in the system.
 */
@Entity
@Table(name = "api_interfaces")
public class ApiInterfaceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // name of the API
    private String type; // REST, SOAP, GraphQL, etc.
    private String base_url; // base URL of the API

    @Column(length = 2000)
    private String description;
    private String auth_type;
    private Boolean is_active = true;
    private LocalDateTime created_at = LocalDateTime.now();
    private LocalDateTime updated_at = LocalDateTime.now();


    // 1:n zu Endpoints
    @OneToMany(mappedBy = "api_interface", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApiEndpointEntity> endpoints;

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }

    public ApiInterfaceEntity() {
    } 

    
}
