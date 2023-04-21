package com.example.mabitbackend.Service;

import com.example.mabitbackend.Dto.MemoResponseDto;
import com.example.mabitbackend.Entity.Todo;
import com.example.mabitbackend.Repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;

    @Transactional
    public Todo 저장하기(Todo todo) {
        return todoRepository.save(todo);
    }

    @Transactional
    public List<Todo> findByTodosId(Long id) {
        return todoRepository.findAll().stream()
                .filter(todo -> todo.getTodos().getId().equals(id))
                .collect(Collectors.toList());
    }
}
