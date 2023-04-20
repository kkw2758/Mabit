package com.example.mabitbackend.Dto;

import com.example.mabitbackend.Entity.Memo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemoRequestDto {
    private Long id;
    private String title;
    private String content;

    @Builder
    public MemoRequestDto(Long memberId, String title, String content) {
        this.title = title;
        this.content = content;
    }

    public Memo toEntity() {
        return Memo.builder()
                .title(title)
                .content(content)
                .build();
    }
}