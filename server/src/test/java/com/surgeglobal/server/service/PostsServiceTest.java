package com.surgeglobal.server.service;

import com.surgeglobal.server.entity.Posts;
import com.surgeglobal.server.repository.PostsRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@ExtendWith(MockitoExtension.class)
public class PostsServiceTest {

    @InjectMocks
    private PostsService postsService;

    @Mock
    private PostsRepository postsRepository;

    @Test
    void shouldThrowExceptionWhenPostDoesNotExist() {
        // Arrange
        Long postId = 999L;
        when(postsRepository.findById(postId)).thenReturn(Optional.empty());

        // Act & Assert
        NoSuchElementException exception = assertThrows(
                NoSuchElementException.class,
                () -> postsService.getPostById(postId)
        );

        assertEquals("Post not found with id: " + postId, exception.getMessage());
    }


    @Test
    void shouldReturnPostWhenPostExists() {
        // Arrange
        Long postId = 1L;
        Posts mockPost = Posts.builder()
                .postId(postId)
                .caption("Sample Caption")
                .photo("URL.from.firebase")
                .build();
//                new Posts(postId, "Test Post", "photo_url");
        when(postsRepository.findById(postId)).thenReturn(Optional.ofNullable(mockPost));

        // Act
        Posts result = postsService.getPostById(postId);

        // Assert
        assertNotNull(result);
        assertEquals(postId, result.getPostId());
        assertEquals("Sample Caption", result.getCaption());
        verify(postsRepository, times(1)).findById(postId);
    }


}
