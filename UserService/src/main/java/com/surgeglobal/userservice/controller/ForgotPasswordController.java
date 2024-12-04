package com.surgeglobal.userservice.controller;


import com.surgeglobal.userservice.dto.ChangePassword;
import com.surgeglobal.userservice.dto.MailBody;
import com.surgeglobal.userservice.entity.ForgotPassword;
import com.surgeglobal.userservice.entity.User;
import com.surgeglobal.userservice.exception.ResourceNotFoundException;
import com.surgeglobal.userservice.repository.ForgotPasswordRepository;
import com.surgeglobal.userservice.repository.UserRepository;
import com.surgeglobal.userservice.service.EmailService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {


    private final UserRepository userRepository;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    public ForgotPasswordController(EmailService emailService,
                                    UserRepository userRepository, ForgotPasswordRepository forgotPasswordRepository,
                                    PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/verifyMail/{email}")
    @Transactional
    public ResponseEntity<String> verifyEmail(@PathVariable String email){
        User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Provide a valid email"));

        try{
            ForgotPassword oldFp = forgotPasswordRepository.FindByUser(user)
                    .orElseThrow(() -> new ResourceNotFoundException("User doesn't exist " + email));
            forgotPasswordRepository.deleteById(oldFp.getFpid());
            forgotPasswordRepository.flush();

        }catch (Exception e){
            System.out.println("User did not exist earlier");
        }

        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("This is your OTP for your forgot password request : " + otp +
                        " This will expire in 90 seconds")
                .subject("OTP for forget password")
                .build();

        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date((System.currentTimeMillis() + 90 * 1000)))
                .user(user)
                .build();

        emailService.sendSimpleMessage(mailBody);
        forgotPasswordRepository.save(fp);

        return ResponseEntity.ok("Email sent for verification!");
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email){

        User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Provide a valid email"));


        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("Invalid OTP for " + email));

        if(fp.getExpirationTime().before(Date.from(Instant.now()))){
            forgotPasswordRepository.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED);
        }
        return ResponseEntity.ok("OTP verified");
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePassword changePassword,
                                                        @PathVariable String email){

        if(!Objects.equals(changePassword.password(), changePassword.repeatPassword())){
            return new ResponseEntity<>("Password does not match", HttpStatus.EXPECTATION_FAILED);
        }
        String encodePassword = passwordEncoder.encode(changePassword.password());

                userRepository.updatePassword(email, encodePassword);


        return ResponseEntity.ok("Password has been changed!");
    }

    private Integer otpGenerator(){
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}


