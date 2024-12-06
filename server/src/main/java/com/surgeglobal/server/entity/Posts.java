package com.surgeglobal.server.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String photo;
    private String caption;

    @ManyToOne
    @JoinColumn(name = "author_email")
    private User author;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    @ElementCollection
    private List<String> likeList;

}
