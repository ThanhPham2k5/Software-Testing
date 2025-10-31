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
        Optional<AccountEntity> account = repository.findByUsername(request.getUsername());
        if(account.isEmpty()){
            return new LoginResponseDTO(false,"Tai khoan khong ton tai",null);
        }

        AccountEntity foundAccount = account.get();
        boolean match = request.getPassword().equals(foundAccount.getPassword());
        if(!match){
            return new LoginResponseDTO(false,"Mat khau khong dung",null);
        }

        return new LoginResponseDTO(true,"Dang nhap thanh cong","token-123");
    }
}
