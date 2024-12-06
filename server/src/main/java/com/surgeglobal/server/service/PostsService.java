package com.surgeglobal.server.service;


import com.surgeglobal.server.dto.PostRequestDTO;
import com.surgeglobal.server.entity.Posts;
import com.surgeglobal.server.entity.User;
import com.surgeglobal.server.repository.PostsRepository;
import com.surgeglobal.server.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PostsService {
    private final PostsRepository postsRepository;
    private final UserRepository userRepository;

    public PostsService(PostsRepository postsRepository,
                        UserRepository userRepository) {
        this.postsRepository = postsRepository;
        this.userRepository = userRepository;
    }

    // Create a new post using PostRequestDTO
    public Posts createPost(PostRequestDTO postRequestDTO, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
        Posts post = Posts.builder()
                .photo(postRequestDTO.getPhoto())
                .caption(postRequestDTO.getCaption())
                .author(user)
                .dateCreated(new Date())
                .build();

        return postsRepository.save(post);
    }

    // Retrieve all posts
    public List<Posts> getAllPosts() {
        return postsRepository.findAll();
    }

    // Retrieve a post by its ID
    public Posts getPostById(Long postId) {
        return postsRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found with id: " + postId));
    }

    // Update an existing post using PostRequestDTO
    public Posts updatePost(Long postId, PostRequestDTO updatedPost) {

        User user = userRepository.findByEmail(updatedPost.getAuthor())
                .orElseThrow(()-> new UsernameNotFoundException("User not found"));
        Posts existingPost = getPostById(postId);
        existingPost.setPhoto(updatedPost.getPhoto());
        existingPost.setCaption(updatedPost.getCaption());
        existingPost.setAuthor(user);
        return postsRepository.save(existingPost);
    }

    // Delete a post by ID
    public void deletePost(Long postId) {
        Posts post = getPostById(postId);
        postsRepository.delete(post);
    }

    // Add a like to a post
    public Posts addLikeToPost(Long postId, String userId) {
        Posts post = getPostById(postId);
        if (!post.getLikeList().contains(userId)) {
            post.getLikeList().add(userId);
            return postsRepository.save(post);
        }
        return post;
    }

    // Remove a like from a post
    public Posts removeLikeFromPost(Long postId, String userId) {
        Posts post = getPostById(postId);
        if (post.getLikeList().remove(userId)) {
            return postsRepository.save(post);
        }
        return post;
    }
}

