package com.example.mabitbackend.Entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String content;

    private Boolean status;

    @ManyToOne
    private Todos todos;
}
