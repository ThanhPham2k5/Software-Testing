package com.flogin.service;

import com.flogin.repository.AccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final AccountRepository repository;

    public AuthService(AccountRepository repository){
        this.repository = repository;
    }

    public boolean login(String username, String password){
        if(username == null || username.isBlank())
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "username cannot be blank"
            );

        if(password == null || password.isBlank())
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "username cannot be blank"
            );

        System.out.println("Login attempt: username=" + username + ", password=" + password);
        return repository.findByUsernameAndPassword(username.trim(), password.trim()).isPresent();
    }
}
