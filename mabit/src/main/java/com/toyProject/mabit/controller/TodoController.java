package com.toyProject.mabit.controller;

import com.toyProject.mabit.dto.TodoRequest;
import com.toyProject.mabit.dto.TodoResponse;
import com.toyProject.mabit.model.TodoEntity;
import com.toyProject.mabit.service.TodoService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

// Cross-Origin Resource Sharing - CORS / 다른 출처의 자원을 공유할 수 있도록 설정하는 권한 체제
// CORS를 설정해주지 않거나 제대로 설정하지 않은 경우, 원하는대로 리소스를 공유하지 못한다.
@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping("/")
public class TodoController {
    private final TodoService service;

    // ResponseEntity
    // 에러 코드와 같은 HTTP상태 코드를 전송하고 싶은 데이터와 함께 전송할 수 있기 때문에
    // 좀 더 세밀한 제어가 필요한 경우 사용한다.
    // ResponseEntity 클래스를 사용하면, 결과값, 상태코드, 헤더값을 모두 프론트에 넘겨줄 수 있다.
    // 에러코드 또한 섬세하게 설정해서 보내줄 수 있다.
    @PostMapping
    public ResponseEntity<TodoResponse> create(@RequestBody TodoRequest request) {
        System.out.println("CREATE");
        if (ObjectUtils.isEmpty(request.getTitle()))
            return ResponseEntity.badRequest().build();

        if (ObjectUtils.isEmpty(request.getOrder()))
            request.setOrder(0L);

        if (ObjectUtils.isEmpty(request.getCompleted()))
            request.setCompleted(false);

        TodoEntity result = this.service.add(request);
        return ResponseEntity.ok(new TodoResponse(result));
    }

    @GetMapping("{id}")
    public ResponseEntity<TodoResponse> readOne(@PathVariable Long id) {
        System.out.println("READ ONE");
        TodoEntity result = this.service.searchById(id);
        return ResponseEntity.ok(new TodoResponse(result));
    }

    @GetMapping
    public ResponseEntity<List<TodoResponse>> readAll() {
        System.out.println("READ ALL");
        List<TodoEntity> List = this.service.searchAll();
        List<TodoResponse> response = List.stream().map(TodoResponse::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PatchMapping("{id}")
    public ResponseEntity<TodoEntity> update(@PathVariable Long id, @RequestBody TodoRequest request) {
        System.out.println("UPDATE");
        TodoEntity result = this.service.updateById(id, request);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteOne(@PathVariable Long id) {
        System.out.println("DELETE ONE");
        this.service.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll() {
        System.out.println("DELETE ALL");
        this.service.deleteAll();
        return ResponseEntity.ok().build();
    }
}
