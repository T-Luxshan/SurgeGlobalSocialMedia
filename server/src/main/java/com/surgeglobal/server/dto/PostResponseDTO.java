package com.surgeglobal.server.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Builder
@Data
@Getter
@Setter
public class PostResponseDTO {
    private Long postId;
    private String photo;
    private String caption;
    private String author;
    private Date dateCreated;
    private List<String> likeList;

}
