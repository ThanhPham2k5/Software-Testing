package com.flogin.controller;

import com.flogin.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service){
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam String username,
            @RequestParam String password){
        boolean success = service.login(username, password);

        if(success){
            return ResponseEntity.ok("Login successful!" + username);
        }else{
            return ResponseEntity.status(401).body("Invalid username or password");
        }

    }

}
