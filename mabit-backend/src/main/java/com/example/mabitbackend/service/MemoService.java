package com.example.mabitbackend.service;

import com.example.mabitbackend.domain.Memo;
import com.example.mabitbackend.domain.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;

    @Transactional
    public Memo 저장하기(Memo memo) {
        return memoRepository.save(memo);
    }
}
