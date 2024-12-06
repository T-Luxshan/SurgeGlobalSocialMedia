package com.surgeglobal.server.repository;

import com.surgeglobal.server.entity.ProfileImage;
import com.surgeglobal.server.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImage, Long> {
    ProfileImage findByUser(User user);

    @Transactional
    void deleteByUser(User user);
}
