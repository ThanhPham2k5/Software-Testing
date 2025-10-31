package com.flogin.service;

import com.flogin.dto.LoginRequestDTO;
import com.flogin.dto.LoginResponseDTO;
import com.flogin.entity.AccountEntity;
import com.flogin.repository.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AuthService {
    private final AccountRepository repository;

    public AuthService(AccountRepository repository){
        this.repository = repository;
    }

    public LoginResponseDTO login(LoginRequestDTO request){
        validateUsername(request.getUsername());
        validatePassword(request.getPassword());

        Optional<AccountEntity> account = repository.findByUsername(request.getUsername());
        if(account.isEmpty()){
            return new LoginResponseDTO(false,"Username is incorrect",null);
        }

        AccountEntity foundAccount = account.get();
        boolean match = request.getPassword().equals(foundAccount.getPassword());
        if(!match){
            return new LoginResponseDTO(false,"Password is incorrect",null);
        }

        return new LoginResponseDTO(true,"Login successful","token-123");
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
