package com.crabsoup.timecapsule.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "letter")
public class Letter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String name;

    private String content;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "endDate")
    private LocalDate endDate;

    public boolean isLocked() {
        return LocalDate.now().isBefore(this.endDate);
    }
    private Integer pw;
       
}