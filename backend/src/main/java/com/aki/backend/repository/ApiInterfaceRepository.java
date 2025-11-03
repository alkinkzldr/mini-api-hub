package com.aki.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.aki.backend.entity.ApiInterfaceEntity;

public interface ApiInterfaceRepository extends JpaRepository<ApiInterfaceEntity, Long> {

    public ApiInterfaceEntity findByName(String name);

    @Query("SELECT a FROM ApiInterfaceEntity a WHERE (SELECT COUNT(e) FROM ApiEndpointEntity e WHERE e.apiInterface.id = a.id) > 5")
    public List<ApiInterfaceEntity> findLargeInterfaces();
}
