package com.flogin.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;
import com.flogin.repository.ProductRepository;
import com.flogin.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class XssSecurityTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @Autowired
    ProductRepository repository;

    @MockitoBean
    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() {
        // Make any token be valid for tests
        when(jwtUtil.validateToken(anyString())).thenReturn(true);
    }

    @Test
    @DisplayName("XSS: Backend must sanitize dangerous HTML")
    void testXssInputIsSanitized() throws Exception {

        String xssPayload = "<script>alert('XSS')</script>";

        ProductDTO request = new ProductDTO(
                xssPayload,
                10.0,
                10,
                "this is a description",
                ProductEntity.Category.COMIC
        );
        request.setImgBase64("test-img-data");

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request))
                        .header("Authorization", "Bearer token-123"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.name").doesNotExist()); // the sanitizer removes <script> but keeps inner text

    }

    @Test
    @DisplayName("Stored XSS: Dangerous input is sanitized before saving")
    void testStoredXssSanitization() throws Exception {
        String xssPayload = "<script>alert('STORED')</script> something else";

        ProductDTO request = new ProductDTO(
                xssPayload,
                10.0,
                10,
                "description",
                ProductEntity.Category.COMIC
        );
        request.setImgBase64("test-img");

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(request))
                        .header("Authorization", "Bearer token-123"))
                .andExpect(status().isOk());

        // Verify saved object is sanitized
        ProductEntity saved = repository.findAll().get(0);
        assertFalse(saved.getName().contains("<script>"));
    }

}

