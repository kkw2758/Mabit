package com.toyProject.mabit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// 데이터베이스로부터 요청과 관련된 클래스
public class TodoRequest {
    private String title;
    private Long order;
    private Boolean completed;
}
