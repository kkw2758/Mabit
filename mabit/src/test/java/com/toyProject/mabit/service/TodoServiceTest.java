package com.toyProject.mabit.service;

import com.toyProject.mabit.dto.TodoRequest;
import com.toyProject.mabit.model.TodoEntity;
import com.toyProject.mabit.repository.TodoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

// Test로 Mock객체를 사용
@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    @Test
    void add() {
        // TodoRepository가 save 메소드를 호출해서 TodoEntity 값을 받으면
        // 받은 Entity 값을 반환
        when(this.todoRepository.save(any(TodoEntity.class)))
                .then(AdditionalAnswers.returnsFirstArg());

        TodoRequest expected = new TodoRequest();
        expected.setTitle("Test Title");

        TodoEntity actual = this.todoService.add(expected);
        System.out.println(actual);
        assertEquals(expected.getTitle(), actual.getTitle());
    }

    @Test
    void searchById() {

    }
}