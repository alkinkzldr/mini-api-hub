package com.aki.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aki.backend.entity.ApiEndpointEntity;
import com.aki.backend.repository.ApiEndpointRepository;

@Service
public class ApiEndpointService {
    private ApiEndpointRepository repo;

    @Autowired
    public ApiEndpointService(ApiEndpointRepository repo){
        this.repo = repo;
    }

    public void createEndpoint(){}

    public void deleteEndpoint(){}

    public void updateEndpoint(){}

    public ApiEndpointEntity getEndpointByID(Long id){
        return repo.findById(id).orElse(null);
    }

}
