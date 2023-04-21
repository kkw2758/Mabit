package com.example.mabitbackend.Controller;

import com.example.mabitbackend.Entity.Todo;
import com.example.mabitbackend.Entity.Todos;
import com.example.mabitbackend.Service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping("/todo")
    public ResponseEntity<?> save(@RequestBody Todo todo) {
        return new ResponseEntity<>(todoService.저장하기(todo), HttpStatus.CREATED);
    }

    @GetMapping("/todo/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return new ResponseEntity<>(todoService.findByTodosId(id),HttpStatus.OK);
    }
}
