package com.flogin.service;

import com.flogin.entity.AccountEntity;
import com.flogin.repository.AccountRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AccountRepository repository;

    public AuthService(AccountRepository repository){
        this.repository = repository;
    }

    public boolean login(String username, String password){
        System.out.println("Login attempt: username=" + username + ", password=" + password);
        return repository.findByUsernameAndPassword(username.trim(), password.trim()).isPresent();
    }
}
