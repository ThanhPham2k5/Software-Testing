package com.flogin.controller;

import com.flogin.dto.LoginRequestDTO;
import com.flogin.dto.LoginResponseDTO;
import com.flogin.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service){
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO account){
        LoginResponseDTO responseAccount = service.login(account);
        if (responseAccount.getStatus()) {
            return ResponseEntity.ok(responseAccount);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseAccount);
        }
    }
}
