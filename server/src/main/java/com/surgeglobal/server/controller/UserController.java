package com.surgeglobal.server.controller;

import com.surgeglobal.server.dto.UserDTO;
import com.surgeglobal.server.dto.UserDetailDTO;
import com.surgeglobal.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @GetMapping
    public ResponseEntity<UserDetailDTO> getUserDetails(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return ResponseEntity.ok(userService.getUserDetails(userName));
    }
    @GetMapping("{email}")
    public ResponseEntity<UserDTO> getUserFromEmailId(@PathVariable("email") String email){
        return ResponseEntity.ok(userService.getUserFromEmailId(email));
    }
    @GetMapping("{email}/checkUserFound")
    public ResponseEntity<Boolean> checkUserFound(@PathVariable("email") String email){
        return ResponseEntity.ok(userService.checkUserFound(email));
    }

    @PatchMapping
    public ResponseEntity<UserDTO> updateUserName(@RequestBody UserDTO userDTO){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        return ResponseEntity.ok(userService.updateUserName(userName, userDTO));
    }

}
