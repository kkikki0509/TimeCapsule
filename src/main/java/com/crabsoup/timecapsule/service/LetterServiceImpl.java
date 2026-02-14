package com.crabsoup.timecapsule.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.crabsoup.timecapsule.model.Letter;
import com.crabsoup.timecapsule.repository.LetterRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;

    @Override
    public Letter createLetter(Letter letter) {
        return letterRepository.save(letter);
    }

    @Override
    public List<Letter> getAllLetters() {
        return letterRepository.findAll();
    }

    @Override
    public Letter getLetterById(Long id) {
        return letterRepository.findById(id).orElseThrow(() -> new RuntimeException("검색 결과가 없습니다"));
    }

    @Override
    public void deleteLetter(Long id, Integer pw) {
        Letter letter = letterRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("글이 올바르지 않습니다"));
        
        if(!Objects.equals(letter.getPw(), pw)) {
            throw new IllegalArgumentException("비밀번호가 틀렸습니다");
        }
        letterRepository.deleteById(id);
    }


    public List<Letter> searchByName(String name) {
        return letterRepository.findByNameContaining(name);
    }

     public List<Letter> search(String type, String keyword, LocalDate date) {

        if ((type == null || type.isBlank()) &&
            (keyword == null || keyword.isBlank()) &&
            date == null) {
                return letterRepository.findAll();
        }

        if ("name".equals(type)) {
            if (date == null) {
                return letterRepository.findByNameContaining(keyword);
            }
            return letterRepository.findByNameContainingAndCreatedAt(keyword, date);
        }

        if ("title".equals(type)) {
            if (date == null) {
                return letterRepository.findByTitleContaining(keyword);
            }
            return letterRepository.findByTitleContainingAndCreatedAt(keyword, date);
        }

        return letterRepository.findAll();
    }
    
}
