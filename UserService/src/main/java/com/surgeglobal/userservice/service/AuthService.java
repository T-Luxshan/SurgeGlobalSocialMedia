package com.surgeglobal.userservice.service;


import com.surgeglobal.userservice.dto.AuthResponse;
import com.surgeglobal.userservice.dto.LoginRequest;
import com.surgeglobal.userservice.dto.RegisterRequest;
import com.surgeglobal.userservice.entity.User;
import com.surgeglobal.userservice.entity.UserRole;
import com.surgeglobal.userservice.exception.UserRegistrationException;
import com.surgeglobal.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public AuthResponse register(RegisterRequest registerRequest) throws UserRegistrationException {

            try {
                User user = User.builder()
                        .email(registerRequest.getEmail())
                        .name(registerRequest.getName())
                        .password(passwordEncoder.encode(registerRequest.getPassword()))
                        .role(UserRole.USER)
                        .build();

                User savedUser = userRepository.save(user);
                var accessToken = jwtService.generateToken(savedUser);
                var refreshToken = refreshTokenService.createRefreshToken(savedUser.getUsername());

                return AuthResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken.getRefreshToken())
                        .build();
            } catch (DataIntegrityViolationException ex) {

                throw new UserRegistrationException("Customer registration failed: " + ex.getMessage());
            }

    }

    public AuthResponse login(LoginRequest loginRequest) {


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );


        var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        var accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(loginRequest.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }
}

