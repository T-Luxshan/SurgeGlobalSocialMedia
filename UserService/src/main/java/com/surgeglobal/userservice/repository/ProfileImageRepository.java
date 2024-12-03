package com.surgeglobal.userservice.repository;

import com.surgeglobal.userservice.entity.ProfileImage;
import com.surgeglobal.userservice.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long> {
    ProfileImage findByUser(User user);

    @Transactional
    void deleteByUser(User user);
}
