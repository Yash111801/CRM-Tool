package com.evalus.crm.repository;

import com.evalus.crm.entity.Deal;
import com.evalus.crm.entity.Deal.DealStage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, Long> {
    
    Page<Deal> findByStage(DealStage stage, Pageable pageable);
    
    Page<Deal> findByAssignedToId(Long userId, Pageable pageable);
    
    @Query("SELECT SUM(d.amount) FROM Deal d WHERE d.stage = 'CLOSED_WON' AND d.updatedAt BETWEEN :startDate AND :endDate")
    BigDecimal getTotalRevenue(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(d) FROM Deal d WHERE d.stage = :stage")
    Long countByStage(@Param("stage") DealStage stage);
    
    @Query("SELECT d.stage, COUNT(d), SUM(d.amount) FROM Deal d GROUP BY d.stage")
    List<Object[]> getDealPipelineAnalytics();
}
