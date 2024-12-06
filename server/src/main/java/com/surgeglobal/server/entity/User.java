package com.surgeglobal.server.entity;

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


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

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

