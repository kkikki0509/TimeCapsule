package com.crabsoup.timecapsule.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crabsoup.timecapsule.model.Letter;
import com.crabsoup.timecapsule.service.LetterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/letters")
@RequiredArgsConstructor
public class LetterController {

    private final LetterService letterService;

    //등록
    @PostMapping
    public Letter createLetter(@RequestBody Letter letter) {
        return letterService.createLetter(letter);
    }

    //전체조회
    @GetMapping
    public List<Letter> getAllLetters() {
        return letterService.getAllLetters();
    }

    //단건조회
    @GetMapping("/{id}")
    public Letter getLetter(@PathVariable Long id) {
        return letterService.getLetterById(id);
    }

    //삭제
    @DeleteMapping("/{id}")
    public void deleteLetter(@PathVariable Long id) {
        letterService.deleteLetter(id);
    }

    @GetMapping("/search")
    public List<Letter> searchLetters(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) LocalDate date
    ) {
        return letterService.search(type, keyword, date);
    }
        

}

