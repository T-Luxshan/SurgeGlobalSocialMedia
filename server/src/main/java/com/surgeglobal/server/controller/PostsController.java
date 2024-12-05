package com.surgeglobal.server.controller;


import com.surgeglobal.server.dto.LikeDTO;
import com.surgeglobal.server.dto.PostRequestDTO;
import com.surgeglobal.server.dto.PostResponseDTO;
import com.surgeglobal.server.entity.Posts;
import com.surgeglobal.server.service.PostsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/posts")
public class PostsController {
    private final PostsService postsService;

    public PostsController(PostsService postsService) {
        this.postsService = postsService;
    }

    @PostMapping
    public ResponseEntity<PostResponseDTO> createPost(@RequestBody PostRequestDTO postRequestDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Posts createdPost = postsService.createPost(postRequestDTO, email);
        PostResponseDTO postResponseDTO = convertToDTO(createdPost);
        return ResponseEntity.status(HttpStatus.CREATED).body(postResponseDTO);
    }

    @GetMapping
    public ResponseEntity<List<PostResponseDTO>> getAllPosts() {
        List<Posts> posts = postsService.getAllPosts();
        List<PostResponseDTO> postResponseDTOs = posts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(postResponseDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDTO> getPostById(@PathVariable Long id) {
        Posts post = postsService.getPostById(id);
        PostResponseDTO postResponseDTO = convertToDTO(post);
        return ResponseEntity.ok(postResponseDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDTO> updatePost(@PathVariable Long id, @RequestBody PostRequestDTO updatedPost) {
        Posts post = postsService.updatePost(id, updatedPost);
        PostResponseDTO postResponseDTO = convertToDTO(post);
        return ResponseEntity.ok(postResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        postsService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<PostResponseDTO> addLike(@PathVariable Long id, @RequestBody LikeDTO userId) {
        Posts post = postsService.addLikeToPost(id, userId);
        PostResponseDTO postResponseDTO = convertToDTO(post);
        return ResponseEntity.ok(postResponseDTO);
    }

    @PostMapping("/{id}/unlike")
    public ResponseEntity<PostResponseDTO> removeLike(@PathVariable Long id, @RequestBody LikeDTO userId) {
        Posts post = postsService.removeLikeFromPost(id, userId);
        PostResponseDTO postResponseDTO = convertToDTO(post);
        return ResponseEntity.ok(postResponseDTO);
    }

    private PostResponseDTO convertToDTO(Posts post) {
        PostResponseDTO postResponseDTO = PostResponseDTO.builder()
                .postId(post.getPostId())
                .photo(post.getPhoto())
                .caption(post.getCaption())
                .author(post.getAuthor().getEmail())
                .dateCreated(post.getDateCreated())
                .likeList(post.getLikeList())
                .build();
//        PostResponseDTO postResponseDTO = new PostResponseDTO();
//        postResponseDTO.setPostId(post.getPostId());
//        postResponseDTO.setPhoto(post.getPhoto());
//        postResponseDTO.setCaption(post.getCaption());
//        postResponseDTO.setAuthor(post.getAuthor());
//        postResponseDTO.setDateCreated(post.getDateCreated());
//        postResponseDTO.setLikeList(post.getLikeList());
        return postResponseDTO;
    }
}
