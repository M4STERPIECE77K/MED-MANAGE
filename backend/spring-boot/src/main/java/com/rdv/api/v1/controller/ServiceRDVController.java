package com.rdv.api.v1.controller;

import com.rdv.entity.ServiceRDV;
import com.rdv.service.ServiceRDVService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/services")
@RequiredArgsConstructor
public class ServiceRDVController {
    private final ServiceRDVService serviceRDVService;

    @GetMapping
    public List<ServiceRDV> getAllServices() {
        return serviceRDVService.findAll();
    }

    @GetMapping("/{id}")
    public ServiceRDV getServiceById(@PathVariable UUID id) {
        return serviceRDVService.findById(id);
    }

    @PostMapping
    public ServiceRDV createService(@RequestBody ServiceRDV serviceRDV) {
        return serviceRDVService.create(serviceRDV);
    }
}
