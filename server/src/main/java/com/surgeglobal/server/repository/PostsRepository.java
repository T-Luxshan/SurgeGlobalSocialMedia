package com.surgeglobal.server.repository;

import com.surgeglobal.server.entity.Posts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostsRepository extends JpaRepository<Posts, Long> {
//    List<Posts> findByAuthor(String author);
}
