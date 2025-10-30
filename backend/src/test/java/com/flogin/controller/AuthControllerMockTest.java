package com.flogin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.dto.LoginRequestDTO;
import com.flogin.dto.LoginResponseDTO;
import com.flogin.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerMockedTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;

    @Test
    @DisplayName("Mock: Controller - Login thanh cong")
    void testLoginSuccess() throws Exception {
        LoginRequestDTO request = new LoginRequestDTO("testuser", "password123");

        LoginResponseDTO mockResponse = new LoginResponseDTO(true, "Dang nhap thanh cong", "token-123");

        when(authService.login(any(LoginRequestDTO.class)))
                .thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.message").value("Dang nhap thanh cong"))
                .andExpect(jsonPath("$.token").value("token-123"));

        verify(authService, times(1)).login(any(LoginRequestDTO.class));
    }

    @Test
    @DisplayName("Mock: Controller - Login that bai voi username sai")
    void testLoginFailWithUsername() throws Exception {
        LoginRequestDTO request = new LoginRequestDTO("wronguser", "password123");

        LoginResponseDTO mockResponse = new LoginResponseDTO(false, "Tai khoan khong ton tai", null);

        when(authService.login(any(LoginRequestDTO.class)))
                .thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Tai khoan khong ton tai"))
                .andExpect(jsonPath("$.token").isEmpty());

        verify(authService, times(1)).login(any(LoginRequestDTO.class));
    }

    @Test
    @DisplayName("Mock: Controller - Login that bai voi password sai")
    void testLoginFailWithPassword() throws Exception {
        LoginRequestDTO request = new LoginRequestDTO("testuser", "wrongpassword");

        LoginResponseDTO mockResponse = new LoginResponseDTO(false, "Mat khau khong dung", null);

        when(authService.login(any(LoginRequestDTO.class)))
                .thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Mat khau khong dung"))
                .andExpect(jsonPath("$.token").isEmpty());

        verify(authService, times(1)).login(any(LoginRequestDTO.class));
    }
}
