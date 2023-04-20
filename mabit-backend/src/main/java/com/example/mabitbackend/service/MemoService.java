package com.example.mabitbackend.Service;

import com.example.mabitbackend.Dto.MemoRequestDto;
import com.example.mabitbackend.Dto.MemoResponseDto;
import com.example.mabitbackend.Entity.Memo;
import com.example.mabitbackend.Repository.MemoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;

//    @Transactional
//    public Memo 메모가져오기(Long id) {
//        return memoRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("id를 확인해주세요!!"));
//    }

    @Transactional
    public MemoResponseDto 메모가져오기(Long id) {
        Memo memo = memoRepository.findById(id).orElseThrow(()
        -> new IllegalArgumentException("해당 게시물이 존재하지 않습니다."));
        return new MemoResponseDto(memo);
    }


//    @Transactional
//    public Memo 저장하기(Memo memo) {
//        return memoRepository.save(memo);
//    }

    @Transactional
    public Memo 저장하기(@RequestBody MemoRequestDto requestDto) {
        return memoRepository.save(requestDto.toEntity());
    }

//    @Transactional(readOnly = true)
//    public List<Memo> 메모들가져오기() {
//        return memoRepository.findAll();
//    }


    @Transactional(readOnly = true)
    public List<MemoResponseDto> 메모들가져오기() {
        return memoRepository.findAll().stream()
                .map(MemoResponseDto::new)
                .collect(Collectors.toList());
    }

//    @Transactional
//    public String 삭제하기(Long id){
//        memoRepository.deleteById(id);
//        return "OK";
//    }
@Transactional
public String 삭제하기(Long id){
    Memo memo = memoRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 존재하지 않습니다."));

    memoRepository.delete(memo);
    return "OK";
}
//    @Transactional
//    public Memo 수정하기( Long id, Memo memo){
//        Memo memoEntity = memoRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("ID를 확인해주세요"));
//        memoEntity.setTitle(memo.getTitle());
//        memoEntity.setContent(memo.getContent());
//        return memoEntity;
//    }

    @Transactional
    public MemoResponseDto 수정하기(Long id, MemoRequestDto requestDto) {
        Memo memo = memoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다."));
        memo.update(requestDto.getTitle(), requestDto.getContent());
        return new MemoResponseDto(memo);
    }
}
