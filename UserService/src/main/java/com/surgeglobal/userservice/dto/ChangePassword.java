package com.surgeglobal.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;

public record ChangePassword (String password, String repeatPassword){
}
