package com.example.mabitbackend.Controller;

import com.example.mabitbackend.Dto.MemoRequestDto;
import com.example.mabitbackend.Dto.MemoResponseDto;
import com.example.mabitbackend.Entity.Memo;
import com.example.mabitbackend.Service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MemoController {
    // POST /memo/{memoname} 저장
    private final MemoService memoService;


//    @CrossOrigin
//    @PostMapping("/memo/{memoName}")
//    public ResponseEntity<?> save(@RequestBody Memo memo, @PathVariable String memoName) {
//        memo.setTitle(memoName);
//        return new ResponseEntity<>(memoService.저장하기(memo), HttpStatus.CREATED);
//    }

    @CrossOrigin
    @PostMapping("/memo/{memoName}")
    public ResponseEntity<?> save(@RequestBody MemoRequestDto requestDto) {
        return new ResponseEntity<>(memoService.저장하기(requestDto), HttpStatus.CREATED);
    }

    @CrossOrigin
    @DeleteMapping("/memo/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(memoService.삭제하기(id), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/memos")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(memoService.메모들가져오기(), HttpStatus.OK);
    }

//    @CrossOrigin
//    @GetMapping("/memo/{id}")
//    public ResponseEntity<?> findById(@PathVariable Long id ){
//        return new ResponseEntity<>(memoService.메모가져오기(id), HttpStatus.OK);
//    }

    @CrossOrigin
    @GetMapping("/memo/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id ){
        MemoResponseDto responseDto = memoService.메모가져오기(id);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

//    @CrossOrigin
//    @PutMapping("/memo/{id}")
//    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Memo memo) {
//        return new ResponseEntity<>(memoService.수정하기(id, memo), HttpStatus.OK);
//    }
    @CrossOrigin
    @PutMapping("/memo/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody MemoRequestDto requestDto) {
        return new ResponseEntity<>(memoService.수정하기(id, requestDto), HttpStatus.OK);
    }
}
