package me.studybook.api.dto.res;

import lombok.*;
import me.studybook.api.domain.PostTag;
import me.studybook.api.domain.User;
import me.studybook.api.repo.user.mapper.UserMapper;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@ToString
public class ResPostsDto {
    private Long id;
    private String title;
    private String publishedAt;
    private UserMapper user;
    private List<String> tags;

    @Builder
    public ResPostsDto(Long id, String title, String publishedAt, UserMapper user, List<String> tags) {
        this.id = id;
        this.title = title;
        this.publishedAt = publishedAt;
        this.user = user;
        this.tags = tags;
    }
}
