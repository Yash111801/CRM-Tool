package com.evalus.crm.controller;

import com.evalus.crm.dto.LeadDTO;
import com.evalus.crm.entity.Lead;
import com.evalus.crm.service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LeadController {
    
    private final LeadService leadService;
    
    @GetMapping
    public ResponseEntity<Page<LeadDTO>> getLeads(
            @RequestParam(required = false) Map<String, String> filters,
            Pageable pageable) {
        Page<LeadDTO> leads = leadService.getLeads(filters, pageable);
        return ResponseEntity.ok(leads);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LeadDTO> getLead(@PathVariable Long id) {
        LeadDTO lead = leadService.getLeadById(id);
        return ResponseEntity.ok(lead);
    }
    
    @PostMapping
    public ResponseEntity<LeadDTO> createLead(@Valid @RequestBody LeadDTO leadDTO) {
        LeadDTO createdLead = leadService.createLead(leadDTO);
        return ResponseEntity.ok(createdLead);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LeadDTO> updateLead(@PathVariable Long id, @Valid @RequestBody LeadDTO leadDTO) {
        LeadDTO updatedLead = leadService.updateLead(id, leadDTO);
        return ResponseEntity.ok(updatedLead);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/convert")
    public ResponseEntity<Map<String, Object>> convertLead(@PathVariable Long id) {
        Map<String, Object> result = leadService.convertLeadToDeal(id);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getLeadAnalytics() {
        Map<String, Object> analytics = leadService.getLeadAnalytics();
        return ResponseEntity.ok(analytics);
    }
}
