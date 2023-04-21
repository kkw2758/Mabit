package com.example.mabitbackend.Service;

import com.example.mabitbackend.Dto.MemoResponseDto;
import com.example.mabitbackend.Dto.TodosResponseDto;
import com.example.mabitbackend.Entity.Memo;
import com.example.mabitbackend.Entity.Todo;
import com.example.mabitbackend.Entity.Todos;
import com.example.mabitbackend.Repository.TodoRepository;
import com.example.mabitbackend.Repository.TodosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodosService {
    private final TodosRepository todosRepository;

    @Transactional
    public Todos 저장하기(Todos todos) {
        return todosRepository.save(todos);
    }

    @Transactional
    public Todos 메모가져오기(Long id) {
        return todosRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("id를 확인해주세요!!"));
    }
    @Transactional(readOnly = true)
    public List<Todos> 메모들가져오기() {
        return todosRepository.findAll();
    }
    @Transactional
    public String 삭제하기(Long id) {
        Todos todos = todosRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 존재하지 않습니다."));

        todosRepository.delete(todos);
        return "OK";
    }
}
