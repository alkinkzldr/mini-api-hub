package com.aki.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aki.backend.entity.ApiEndpointEntity;

public interface ApiEndpointRepository extends JpaRepository<ApiEndpointEntity, Long> {

    List<ApiEndpointEntity> findByApiInterface_Id(Long apiId);
    // Note: ApiEndpointEntity doesn't have a 'name' field
    // If you need to find endpoints by path, use: findByPath(String path)
    // If you need to find by HTTP method, use: findByHttpMethod(String httpMethod)
    Optional<ApiEndpointEntity> findById(Long id);

}
