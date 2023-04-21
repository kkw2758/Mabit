package com.example.mabitbackend.Controller;

import com.example.mabitbackend.Dto.MemoRequestDto;
import com.example.mabitbackend.Dto.MemoResponseDto;
import com.example.mabitbackend.Entity.Todo;
import com.example.mabitbackend.Entity.Todos;
import com.example.mabitbackend.Repository.TodosRepository;
import com.example.mabitbackend.Service.TodosService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequiredArgsConstructor
@RestController
public class TodosController {
    private final TodosService todosService;
    @CrossOrigin
    @GetMapping("/todos")
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(todosService.메모들가져오기(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/todos")
    public ResponseEntity<?> save(@RequestBody Todos todos) {
        return new ResponseEntity<>(todosService.저장하기(todos), HttpStatus.CREATED);
    }
    @CrossOrigin
    @GetMapping("/todos/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id ){
        Todos a = todosService.메모가져오기(id);
//        System.out.println("A" + a.getTodoList());
        return new ResponseEntity<>(a.getTodoList(), HttpStatus.OK);
    }
    @CrossOrigin
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        return new ResponseEntity<>(todosService.삭제하기(id), HttpStatus.OK);
    }
}
