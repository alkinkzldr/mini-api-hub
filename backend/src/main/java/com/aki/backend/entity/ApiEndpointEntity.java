package com.aki.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "api_endpoints")
public class ApiEndpointEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "api_id", nullable = false)
    private ApiInterfaceEntity apiInterface;  // gehört zu einer API

    private String httpMethod;

    @Column(length = 2000)
    private String path;
    @Column(length = 4000)
    private String description;

    @Column(columnDefinition = "jsonb")
    private String requestExample;
    @Column(columnDefinition = "jsonb")
    private String responseExample;

    private Boolean isActive = true;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public ApiEndpointEntity() {
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ApiInterfaceEntity getApiInterface() { return apiInterface; }
    public void setApiInterface(ApiInterfaceEntity apiInterface) { this.apiInterface = apiInterface; }

    public String getHttpMethod() { return httpMethod; }
    public void setHttpMethod(String http_Method) { this.httpMethod = http_Method; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getRequestExample() { return requestExample; }
    public void setRequestExample(String requestExample) { this.requestExample = requestExample; }

    public String getResponseExample() { return responseExample; }
    public void setResponseExample(String responseExample) { this.responseExample = responseExample; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean active) { isActive = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

}
