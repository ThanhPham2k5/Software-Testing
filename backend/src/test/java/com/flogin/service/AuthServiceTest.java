package com.flogin.service;

import com.flogin.dto.LoginRequestDTO;
import com.flogin.dto.LoginResponseDTO;
import com.flogin.entity.AccountEntity;
import com.flogin.repository.AccountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("Login service unit test")
class AuthServiceTest {
    private AuthService authService;

    @Mock
    private AccountRepository mockRepository;

    @BeforeEach
    void setUp() {
        authService = new AuthService(mockRepository);
    }

    @Test
    @DisplayName("Login thanh cong")
    void testLoginSuccess(){
        LoginRequestDTO request = new LoginRequestDTO("testuser", "password123");

        AccountEntity mockAccount = new AccountEntity();
        mockAccount.setUsername("testuser");
        mockAccount.setPassword("password123");

        when(mockRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(mockAccount));

        LoginResponseDTO response = authService.login(request);

        assertTrue(response.isStatus());
        assertEquals("Dang nhap thanh cong", response.getMessage());
    }

    @Test
    @DisplayName("Login that bai voi username sai")
    void testLoginFailWithUsername(){
        LoginRequestDTO request = new LoginRequestDTO("testuser", "password123");

        when(mockRepository.findByUsername("testuser"))
                .thenReturn(Optional.empty());

        LoginResponseDTO response = authService.login(request);

        assertFalse(response.isStatus());
        assertEquals("Tai khoan khong ton tai", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    @DisplayName("Login that bai voi password sai")
    void testLoginFailWithPassword(){
        LoginRequestDTO request = new LoginRequestDTO("testuser", "password123");

        AccountEntity mockAccount = new AccountEntity();
        mockAccount.setUsername("testuser");
        mockAccount.setPassword("123");

        when(mockRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(mockAccount));

        LoginResponseDTO response = authService.login(request);

        assertFalse(response.isStatus());
        assertEquals("Mat khau khong dung", response.getMessage());
        assertNull(response.getToken());
    }
}
