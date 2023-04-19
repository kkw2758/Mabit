package com.example.mabitbackend.service;

import com.example.mabitbackend.domain.Memo;
import com.example.mabitbackend.domain.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;

    @Transactional
    public Memo 저장하기(Memo memo) {
        return memoRepository.save(memo);
    }

    @Transactional
    public List<Memo> 메모들가져오기() {
        return memoRepository.findAll();
    }

    @Transactional
    public String 삭제하기(Long id){
        memoRepository.deleteById(id);
        return "OK";
    }
}
