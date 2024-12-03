package com.surgeglobal.userservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public  class User implements UserDetails{

    @Id
    @Column(unique = true,nullable = false)
    @Email(message = "Please enter valid email")
    private String email;

    @NotBlank(message = "Field can not be empty")
    private String name;

    @NotBlank(message = "Field can not be empty")
    @Size(min = 5, message = "The password must have at least 5 characters")
    private String password;

    @Enumerated(EnumType.STRING)
    UserRole role;

    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private RefreshToken refreshToken;

    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.DETACH, orphanRemoval = true)
    private ForgotPassword forgotPassword;


//    private boolean isVerified = true;
//    private boolean isEnabled = true;
//    private boolean isAccountNonExpired = true;
//    private boolean isAccountNonLocked = true;
//    private boolean isCredentialsNonExpired = true;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }

//    public void setPassword(String password) {
//        this.password = password;
//    }

//    public UserRole getRole() {
//        return role;
//    }

//    public void setRole(UserRole role) {
//        this.role = role;
//    }
//
//    public RefreshToken getRefreshToken() {
//        return refreshToken;
//    }
//
//    public void setRefreshToken(RefreshToken refreshToken) {
//        this.refreshToken = refreshToken;
//    }
//
//    public ForgotPassword getForgotPassword() {
//        return forgotPassword;
//    }
//
//    public void setForgotPassword(ForgotPassword forgotPassword) {
//        this.forgotPassword = forgotPassword;
//    }
//
//    public boolean isVerified() {
//        return true;
//    }
//
//    public void setVerified(boolean verified) {
//        isVerified = true;
//    }
//
//    public void setEnabled(boolean enabled) {
//        isEnabled = true;
//    }
//
//    public void setAccountNonExpired(boolean accountNonExpired) {
//        isAccountNonExpired = true;
//    }
//
//    public void setAccountNonLocked(boolean accountNonLocked) {
//        isAccountNonLocked = true;
//    }
//
//    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
//        isCredentialsNonExpired = true;
//    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



}

