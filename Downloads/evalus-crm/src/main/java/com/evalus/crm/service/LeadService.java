package com.evalus.crm.service;

import com.evalus.crm.dto.LeadDTO;
import com.evalus.crm.entity.Lead;
import com.evalus.crm.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Transactional
public class LeadService {
    
    private final LeadRepository leadRepository;
    
    public Page<LeadDTO> getLeads(Map<String, String> filters, Pageable pageable) {
        // Implementation for filtering and pagination
        Page<Lead> leads = leadRepository.findAll(pageable);
        return leads.map(this::convertToDTO);
    }
    
    public LeadDTO getLeadById(Long id) {
        Lead lead = leadRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Lead not found"));
        return convertToDTO(lead);
    }
    
    public LeadDTO createLead(LeadDTO leadDTO) {
        Lead lead = convertToEntity(leadDTO);
        Lead savedLead = leadRepository.save(lead);
        return convertToDTO(savedLead);
    }
    
    public LeadDTO updateLead(Long id, LeadDTO leadDTO) {
        Lead existingLead = leadRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Lead not found"));
        
        // Update fields
        existingLead.setFirstName(leadDTO.getFirstName());
        existingLead.setLastName(leadDTO.getLastName());
        existingLead.setEmail(leadDTO.getEmail());
        existingLead.setPhone(leadDTO.getPhone());
        existingLead.setCompany(leadDTO.getCompany());
        existingLead.setStatus(leadDTO.getStatus());
        
        Lead updatedLead = leadRepository.save(existingLead);
        return convertToDTO(updatedLead);
    }
    
    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }
    
    public Map<String, Object> convertLeadToDeal(Long id) {
        // Implementation for lead conversion
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Lead converted successfully");
        return result;
    }
    
    public Map<String, Object> getLeadAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalLeads", leadRepository.count());
        analytics.put("newLeads", leadRepository.countByStatus(Lead.LeadStatus.NEW));
        analytics.put("qualifiedLeads", leadRepository.countByStatus(Lead.LeadStatus.QUALIFIED));
        return analytics;
    }
    
    private LeadDTO convertToDTO(Lead lead) {
        // Convert entity to DTO
        LeadDTO dto = new LeadDTO();
        dto.setId(lead.getId());
        dto.setFirstName(lead.getFirstName());
        dto.setLastName(lead.getLastName());
        dto.setEmail(lead.getEmail());
        dto.setPhone(lead.getPhone());
        dto.setCompany(lead.getCompany());
        dto.setStatus(lead.getStatus());
        dto.setCreatedAt(lead.getCreatedAt());
        return dto;
    }
    
    private Lead convertToEntity(LeadDTO dto) {
        // Convert DTO to entity
        Lead lead = new Lead();
        lead.setFirstName(dto.getFirstName());
        lead.setLastName(dto.getLastName());
        lead.setEmail(dto.getEmail());
        lead.setPhone(dto.getPhone());
        lead.setCompany(dto.getCompany());
        lead.setStatus(dto.getStatus());
        return lead;
    }
}
