package com.surgeglobal.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class EmailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com"); // SMTP host
        mailSender.setPort(587); // Port for STARTTLS
        mailSender.setUsername("luxshan.thuraisingam@gmail.com"); // Your email address
        mailSender.setPassword("oojo dozp dnkd ehnd"); // Your email password

        // Set JavaMail properties for STARTTLS
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true"); // Enable STARTTLS
        props.put("mail.smtp.starttls.required", "true"); // Ensure STARTTLS is required
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com"); // Trust Gmail's server

        return mailSender;
    }
}
