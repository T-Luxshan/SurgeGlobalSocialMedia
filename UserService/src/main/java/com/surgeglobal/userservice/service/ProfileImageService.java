package com.surgeglobal.userservice.service;


import com.surgeglobal.userservice.dto.ProfileImgDTO;
import com.surgeglobal.userservice.entity.ProfileImage;
import com.surgeglobal.userservice.entity.User;
import com.surgeglobal.userservice.exception.ResourceNotFoundException;
import com.surgeglobal.userservice.repository.ProfileImageRepository;
import com.surgeglobal.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileImageService {

    @Autowired
    private final ProfileImageRepository profileImageRepository;
    private final UserRepository userRepository;

    public ProfileImageService(ProfileImageRepository profileImageRepository, UserRepository userRepository) {
        this.profileImageRepository = profileImageRepository;
        this.userRepository = userRepository;
    }


    public ProfileImgDTO addProfilePhoto(String email, ProfileImgDTO profileImgDTO) {
        User user = userRepository.findById(email)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));

        ProfileImage profileImage = ProfileImage.builder()
                .profileUri(profileImgDTO.getProfileUri())
                .user(user)
                .build();

        try{
            profileImage = profileImageRepository.save(profileImage);

            return ProfileImgDTO.builder()
                    .profileUri(profileImage.getProfileUri())
                    .build();
        } catch (Exception e) {
            return updateProfilePhotoByUser(email, profileImgDTO);
        }

    }

    public ProfileImgDTO updateProfilePhotoByUser(String email, ProfileImgDTO profileImgDTO) {
        User user = userRepository.findById(email)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));

        ProfileImage existingProfile = profileImageRepository.findByUser(user);
        existingProfile.setProfileUri(profileImgDTO.getProfileUri());
        existingProfile = profileImageRepository.save(existingProfile);

        return ProfileImgDTO.builder()
                .profileUri(existingProfile.getProfileUri())
                .build();
    }

    public String deleteProfile(String email) {
        User user = userRepository.findById(email)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));

        profileImageRepository.deleteByUser(user);

        return "Deletion success";
    }

    public ProfileImgDTO getProfile(String currentPrincipalName) {
        User user =  userRepository.findById(currentPrincipalName)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));

        try{
            ProfileImage profileImage = profileImageRepository.findByUser(user);
            return ProfileImgDTO.builder()
                    .profileUri(profileImage.getProfileUri())
                    .build();
        }
        catch (NullPointerException nullPointerException){
            return new ProfileImgDTO();
        }
    }
}

