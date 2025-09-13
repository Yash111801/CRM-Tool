package com.evalus.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "leads")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String phone;
    private String company;
    private String jobTitle;
    
    @Enumerated(EnumType.STRING)
    private LeadStatus status = LeadStatus.NEW;
    
    @Enumerated(EnumType.STRING)
    private LeadSource source;
    
    private BigDecimal estimatedValue;
    private Integer score = 0;
    
    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIUM;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User assignedTo;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    private LocalDateTime slaDeadline;
    
    public enum LeadStatus {
        NEW, CONTACTED, QUALIFIED, PROPOSAL, NEGOTIATION, CLOSED_WON, CLOSED_LOST
    }
    
    public enum LeadSource {
        WEBSITE, SOCIAL_MEDIA, EMAIL_CAMPAIGN, REFERRAL, COLD_CALL, TRADE_SHOW, OTHER
    }
    
    public enum Priority {
        LOW, MEDIUM, HIGH, URGENT
    }
}
