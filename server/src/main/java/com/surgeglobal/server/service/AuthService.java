package com.surgeglobal.server.service;


import com.surgeglobal.server.dto.AuthResponse;
import com.surgeglobal.server.dto.LoginRequest;
import com.surgeglobal.server.dto.RegisterRequest;
import com.surgeglobal.server.entity.User;
import com.surgeglobal.server.entity.UserRole;
import com.surgeglobal.server.exception.UserRegistrationException;
import com.surgeglobal.server.repository.UserRepository;
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

