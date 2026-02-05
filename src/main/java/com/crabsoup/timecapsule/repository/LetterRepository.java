package com.crabsoup.timecapsule.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.crabsoup.timecapsule.model.Letter;

public interface LetterRepository extends JpaRepository<Letter, Long> {

    //조회기능에 필요한 코드
    List<Letter> findByNameContaining(String name);
    List<Letter> findByNameContainingAndCreatedAt(String name, LocalDate date);
    List<Letter> findByTitleContaining(String Title);
    List<Letter> findByTitleContainingAndCreatedAt(String title, LocalDate date);
    
}
