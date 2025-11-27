package com.flogin.service;

import com.flogin.util.JwtUtil;
import com.flogin.util.XssSanitizer;
import com.flogin.dto.LoginRequestDTO;
import com.flogin.dto.LoginResponseDTO;
import com.flogin.entity.AccountEntity;
import com.flogin.repository.AccountRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final XssSanitizer sanitizer;
    private final JwtUtil jwtUtil;
    private final AccountRepository repository;
    private BCryptPasswordEncoder passwordEncoder;

    public AuthService(AccountRepository repository, XssSanitizer sanitizer, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder){
        this.jwtUtil = jwtUtil;
        this.sanitizer = sanitizer;
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponseDTO login(LoginRequestDTO request){
        String sanitizedUsername = sanitizer.sanitize(request.getUsername());

        validateUsername(sanitizedUsername);
        validatePassword(request.getPassword());

        Optional<AccountEntity> account = repository.findByUsername(sanitizedUsername);
        if(account.isEmpty()){
            return new LoginResponseDTO(false,"Username is incorrect",null);
        }

        AccountEntity foundAccount = account.get();
        boolean match = passwordEncoder.matches(request.getPassword(), foundAccount.getPassword());
        if(!match){
            return new LoginResponseDTO(false,"Password is incorrect",null);
        }

        String token = jwtUtil.generateToken(foundAccount.getUsername());

        return new LoginResponseDTO(true,"Login successful", token);
    }

    public void validateUsername(String username){
        if(username == null || username.isBlank())
            throw new IllegalArgumentException("Username cannot be empty");
    }

    public void validatePassword(String password){
        if(password == null || password.isBlank())
            throw new IllegalArgumentException("Password cannot be empty");
    }
}
