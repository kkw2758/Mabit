package com.example.mabitbackend.Dto;

import com.example.mabitbackend.Entity.Memo;
import com.example.mabitbackend.Entity.Todos;
import lombok.Getter;

@Getter
public class TodosResponseDto {
    private Long id;
    private String title;

    public TodosResponseDto(Todos entity) {
        this.title = entity.getTitle();
    }
}
