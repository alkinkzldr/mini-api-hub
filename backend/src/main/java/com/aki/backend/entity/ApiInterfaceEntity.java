package com.aki.backend.entity;

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
    @OneToMany(mappedBy = "apiInterface", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ApiEndpointEntity> endpoints;

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }

    public ApiInterfaceEntity() {
    } 

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getBase_url() {
        return base_url;
    }
    public void setBase_url(String base_url) {
        this.base_url = base_url;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getAuth_type() {
        return auth_type;
    }
    public void setAuth_type(String auth_type) {
        this.auth_type = auth_type;
    }
    public Boolean getIs_active() {
        return is_active;
    }
    public void setIs_active(Boolean is_active) {
        this.is_active = is_active;
    }
    public LocalDateTime getCreated_at() {
        return created_at;
    }
    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
    public LocalDateTime getUpdated_at() {
        return updated_at;
    }
    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }  

}
