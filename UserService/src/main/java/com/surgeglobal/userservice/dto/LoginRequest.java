package com.surgeglobal.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest implements Serializable {
    @NotNull
    @Email(message = "Please enter valid email")
    String email;
    @Size(message = "The password must have at least 5 characters", min = 5)
    @NotBlank(message = "Field can not be empty")
    String password;
}