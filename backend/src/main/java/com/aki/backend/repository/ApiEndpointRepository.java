package com.aki.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aki.backend.entity.ApiEndpointEntity;

public interface ApiEndpointRepository extends JpaRepository<ApiEndpointEntity, Long> {

    List<ApiEndpointEntity> findByApiInterface_Id(Long apiId);
    List<ApiEndpointEntity> findByName(String name);
    Optional<ApiEndpointEntity> findById(Long id);

}
