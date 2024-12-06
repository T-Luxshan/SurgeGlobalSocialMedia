package com.surgeglobal.server.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Data
@Getter
@Setter
public class PostRequestDTO {
    private String photo;
    private String caption;
    private String author;

}
