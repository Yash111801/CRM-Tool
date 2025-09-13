package com.evalus.crm.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "organizations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String industry;
    private String website;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<Contact> contacts;
    
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL)
    private List<Deal> deals;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
