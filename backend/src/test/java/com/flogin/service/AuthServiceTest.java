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
    @DisplayName("Login successful")
    void testLoginSuccess(){
        LoginRequestDTO request = new LoginRequestDTO("testuser", "password123");

        AccountEntity mockAccount = new AccountEntity();
        mockAccount.setUsername("testuser");
        mockAccount.setPassword("password123");

        when(mockRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(mockAccount));

        LoginResponseDTO response = authService.login(request);

        assertTrue(response.getStatus());
        assertEquals("Login successful", response.getMessage());
    }

    @Test
    @DisplayName("Login fail with incorrect username")
    void testLoginFailWithUsername(){
        LoginRequestDTO request = new LoginRequestDTO("testuser", "password123");

        when(mockRepository.findByUsername("testuser"))
                .thenReturn(Optional.empty());

        LoginResponseDTO response = authService.login(request);

        assertFalse(response.getStatus());
        assertEquals("Username is incorrect", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    @DisplayName("Login fail with incorrect password")
    void testLoginFailWithPassword(){
        LoginRequestDTO request = new LoginRequestDTO("testuser", "password123");

        AccountEntity mockAccount = new AccountEntity();
        mockAccount.setUsername("testuser");
        mockAccount.setPassword("123");

        when(mockRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(mockAccount));

        LoginResponseDTO response = authService.login(request);

        assertFalse(response.getStatus());
        assertEquals("Password is incorrect", response.getMessage());
        assertNull(response.getToken());
    }

    @Test
    @DisplayName("Login fail with empty username")
    void testLoginFailWithEmptyUsername(){
        LoginRequestDTO request = new LoginRequestDTO("", "123");

        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                ()->authService.login(request)
        );
        assertEquals("Username cannot be empty", thrown.getMessage());
    }

    @Test
    @DisplayName("Login fail with empty password")
    void testLoginFailWithEmptyPassword(){
        LoginRequestDTO request = new LoginRequestDTO("testuser", "");

        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                ()->authService.login(request)
        );
        assertEquals("Password cannot be empty", thrown.getMessage());
    }

    @Test
    @DisplayName("Login fail with null username")
    void testLoginFailWithNullUsername(){
        LoginRequestDTO request = new LoginRequestDTO(null, "123");

        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                ()->authService.login(request)
        );
        assertEquals("Username cannot be empty", thrown.getMessage());
    }

    @Test
    @DisplayName("Login fail with null password")
    void testLoginFailWithNullPassword(){
        LoginRequestDTO request = new LoginRequestDTO("testuser", null);

        IllegalArgumentException thrown = assertThrows(
                IllegalArgumentException.class,
                ()->authService.login(request)
        );
        assertEquals("Password cannot be empty", thrown.getMessage());
    }

}
