package com.surgeglobal.server.controller;

import com.surgeglobal.server.dto.ProfileImgDTO;
import com.surgeglobal.server.service.ProfileImageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@ExtendWith(MockitoExtension.class)
public class ProfileImageControllerTest {

    @Mock
    private ProfileImageService profileImageService;

    @InjectMocks
    private ProfileImageController profileImageController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(profileImageController).build();
    }

    @Test
    public void testGetProfilePhotoByEmail() throws Exception {
        // Arrange
        String email = "test@example.com";
        ProfileImgDTO mockProfileImgDTO = ProfileImgDTO.builder()
                .profileUri("profileUri")
                .build();
//                new ProfileImgDTO("photoUrl", "image/jpeg");

        // Mock the service call
        when(profileImageService.getProfile(email)).thenReturn(mockProfileImgDTO);

        // Act & Assert
        mockMvc.perform(get("/api/v1/profile/{email}", email)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // Check that the status is 200 OK
                .andExpect(jsonPath("$.profileUri").value("profileUri")); // Check that the photoUrl is correct
//                .andExpect(jsonPath("$.contentType").value("image/jpeg")); // Check that the contentType is correct
    }
}
