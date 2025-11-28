package com.flogin.security;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.SecurityConfig;
import com.flogin.controller.ProductController;
import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;
import com.flogin.service.ProductService;
import com.flogin.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
@Import(SecurityConfig.class)
@DisplayName("Authentication bypass attempts tests")
public class AuthBypassSecurityTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductService productService;

    @MockitoBean
    private JwtUtil jwtUtil;

    private ProductDTO sampleProduct;

    @BeforeEach
    void setup() {
        sampleProduct = new ProductDTO(
                "Book1",
                100.0,
                10,
                "Description",
                ProductEntity.Category.COMIC
        );
        sampleProduct.setImgBase64("test-img-data");
    }

    @Test
    @DisplayName("Should be rejected without a token")
    void testCreateProductNoToken() throws Exception {
        mockMvc.perform(post("/api/products")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(sampleProduct)))
                .andExpect(status().isUnauthorized())
                .andExpect(status().reason("Missing token"));
    }

    @Test
    @DisplayName("Should be rejected with an invalid token")
    void testCreateProductInvalidToken() throws Exception {
        when(jwtUtil.validateToken("Bearer invalid-token"))
                .thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired token"));

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sampleProduct))
                        .header("Authorization", "Bearer invalid-token"))
                .andExpect(status().isUnauthorized())
                .andExpect(status().reason("Invalid or expired token"));
    }
}
