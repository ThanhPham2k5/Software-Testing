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
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@DisplayName("Login API Integration Tests")
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private AuthService authService;

    @Test
    @DisplayName("POST /api/auth/login - Login thanh cong")
    void testLogin_Success() throws Exception {
        LoginRequestDTO request = new LoginRequestDTO("testuser", "password123");

        LoginResponseDTO mockResponse = new LoginResponseDTO(true, "Dang nhap thanh cong", "token-123");

        when(authService.login(any(LoginRequestDTO.class)))
                .thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk()) // Mong đợi HTTP 200
                .andExpect(jsonPath("$.status").value(true))
                .andExpect(jsonPath("$.message").value("Dang nhap thanh cong"))
                .andExpect(jsonPath("$.token").value("token-123"));
    }

    @Test
    @DisplayName("POST /api/auth/login - Sai mat khau")
    void testLogin_WrongPassword() throws Exception {
        LoginRequestDTO request = new LoginRequestDTO("testuser", "wrongpassword");

        LoginResponseDTO mockResponse = new LoginResponseDTO(false, "Mat khau khong dung", null);

        when(authService.login(any(LoginRequestDTO.class)))
                .thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Mat khau khong dung"))
                .andExpect(jsonPath("$.token").isEmpty());
    }

    @Test
    @DisplayName("POST /api/auth/login - Username khong ton tai")
    void testLogin_UserNotFound() throws Exception {
        LoginRequestDTO request = new LoginRequestDTO("nonexistentuser", "12345");

        LoginResponseDTO mockResponse = new LoginResponseDTO(false, "Tai khoan khong ton tai", null);

        when(authService.login(any(LoginRequestDTO.class)))
                .thenReturn(mockResponse);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(false))
                .andExpect(jsonPath("$.message").value("Tai khoan khong ton tai"))
                .andExpect(jsonPath("$.token").isEmpty());
    }
}