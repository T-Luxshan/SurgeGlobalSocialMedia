package com.surgeglobal.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDetailDTO implements Serializable {
    @Email(message = "Please enter valid email")
    String email;
    @NotBlank(message = "Field can not be empty")
    String name;
    String profileUri;
}