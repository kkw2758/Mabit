package com.example.mabitbackend.controller;

import com.example.mabitbackend.domain.Memo;
import com.example.mabitbackend.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemoController {
    // POST /memo/{memoname} 저장
    private final MemoService memoService;
    @CrossOrigin
    @PostMapping("/memo/{memoName}")
    public ResponseEntity<?> save(@RequestBody Memo memo, @PathVariable String memoName) {
        memo.setTitle(memoName);
        return new ResponseEntity<>(memoService.저장하기(memo), HttpStatus.CREATED);
    }
}
