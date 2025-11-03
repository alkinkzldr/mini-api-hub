package com.aki.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import com.aki.backend.entity.ApiEndpointEntity;
import com.aki.backend.entity.ApiInterfaceEntity;
import com.aki.backend.repository.ApiEndpointRepository;
import com.aki.backend.repository.ApiInterfaceRepository;

@Service
public class ApiInterfaceService {

    private final ApiInterfaceRepository repo;
    private final ApiEndpointRepository endpointRepo;

    @Autowired
    public ApiInterfaceService(ApiInterfaceRepository repo, ApiEndpointRepository endpointRepo) {
        this.repo = repo;
        this.endpointRepo = endpointRepo;
    }

    public List<ApiInterfaceEntity> getAllInterfaces() {
        return repo.findAll();
    }

    public List<ApiInterfaceEntity> getLargeInterfaces() {
        return repo.findLargeInterfaces();
    }
    
    public ApiInterfaceEntity getInterfaceByName(String name) {
        return repo.findByName(name);
    }
    
    public ApiInterfaceEntity getInterfaceById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<ApiEndpointEntity> getEndpointsByApiId(Long apiId) {
        return endpointRepo.findByApiInterface_Id(apiId);
    }

    public ApiInterfaceEntity createApiInterface(ApiInterfaceEntity apiInterface) {
        if (repo.findByName(apiInterface.getName()) != null) {
            throw new RuntimeException("API Interface with name already exists: " + apiInterface.getName());
        }
        return repo.save(apiInterface);
    }

    public void deleteApiInterface(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("API Interface not found with id: " + id);
        }
        repo.deleteById(id);
    }

    public ApiInterfaceEntity updateApiInterface(Long id, ApiInterfaceEntity updatedApiInterface) {
        
        ApiInterfaceEntity existingInt = getInterfaceById(id);
        
        if (existingInt != null) {
            existingInt.setName(updatedApiInterface.getName());
            existingInt.setType(updatedApiInterface.getType());
            existingInt.setBase_url(updatedApiInterface.getBase_url());
            existingInt.setDescription(updatedApiInterface.getDescription());
            existingInt.setAuth_type(updatedApiInterface.getAuth_type());
            existingInt.setIs_active(updatedApiInterface.getIs_active());
        } else {
            throw new RuntimeException("API Interface not found with id: " + id);
        }

        return repo.save(existingInt);
    }

}
