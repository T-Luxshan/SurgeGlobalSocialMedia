package com.surgeglobal.server.service;

import com.surgeglobal.server.dto.UserDTO;
import com.surgeglobal.server.dto.UserDetailDTO;
import com.surgeglobal.server.entity.ProfileImage;
import com.surgeglobal.server.entity.User;
import com.surgeglobal.server.repository.ProfileImageRepository;
import com.surgeglobal.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProfileImageRepository profileImageRepository;


    public UserDetailDTO getUserDetails(String userName) {
        User user = userRepository.findByEmail(userName)
                .orElseThrow(()-> new UsernameNotFoundException("User not found for this email"));

        ProfileImage profileImage = profileImageRepository.findByUser(user);

        return UserDetailDTO.builder()
                .name(user.getName())
                .email(user.getEmail())
                .profileUri(profileImage.getProfileUri())
                .build();

    }

    public UserDTO getUserFromEmailId(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User not found for this email"));

        return UserDTO.builder()
                .name(user.getName())
                .build();
    }

    public Boolean checkUserFound(String email) {
        return userRepository.existsById(email);
    }

    public UserDTO updateUserName(String email, UserDTO userDTO) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("User Not found"));

        user.setName(userDTO.getName());
        User updatedUser = userRepository.save(user);

        return UserDTO.builder()
                .name(updatedUser.getName())
                .build();
    }
}
