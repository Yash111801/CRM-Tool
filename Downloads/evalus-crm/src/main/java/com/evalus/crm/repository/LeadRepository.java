package com.evalus.crm.repository;

import com.evalus.crm.entity.Lead;
import com.evalus.crm.entity.Lead.LeadStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    
    Page<Lead> findByStatus(LeadStatus status, Pageable pageable);
    
    Page<Lead> findByAssignedToId(Long userId, Pageable pageable);
    
    List<Lead> findBySlaDeadlineBefore(LocalDateTime deadline);
    
    @Query("SELECT COUNT(l) FROM Lead l WHERE l.status = :status")
    Long countByStatus(@Param("status") LeadStatus status);
    
    @Query("SELECT l FROM Lead l WHERE l.email LIKE %:search% OR l.firstName LIKE %:search% OR l.lastName LIKE %:search% OR l.company LIKE %:search%")
    Page<Lead> searchLeads(@Param("search") String search, Pageable pageable);
    
    @Query("SELECT l.source, COUNT(l) FROM Lead l GROUP BY l.source")
    List<Object[]> getLeadSourceAnalytics();
}
