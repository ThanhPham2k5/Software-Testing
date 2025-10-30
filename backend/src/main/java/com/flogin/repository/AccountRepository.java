package com.flogin.repository;

import com.flogin.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    Optional<AccountEntity> findByUsernameAndPassword(String username, String password);
    Optional<AccountEntity> findByUsername(String username);
}
