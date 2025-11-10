package com.flogin.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;
import com.flogin.service.ProductService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
@DisplayName("Product API Integration Tests")
class ProductControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductService productService;

    @Test
    @DisplayName("GET /api/products")
    void testGetAllProductsSuccessful() throws Exception{
        ProductDTO product1 = new ProductDTO();
        ProductDTO product2 = new ProductDTO();
        product1.setName("Book1");
        product2.setName("Book2");

        List<ProductDTO> productList = List.of(product1, product2);

        Page<ProductDTO> productPage = new PageImpl<>(productList, PageRequest.of(0,2), 2);

        when(productService.getAllProducts(anyInt(), anyInt()))
                .thenReturn(productPage);

        mockMvc.perform(get("/api/products")
                        .param("page", "0")
                        .param("size", "2")
                        .header("Origin", "http://localhost:5173"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(2)))
                .andExpect(jsonPath("$.content[0].name").value("Book1"))
                .andExpect(jsonPath("$.content[1].name").value("Book2"))
                .andExpect(jsonPath("$.number").value(0))
                .andExpect(jsonPath("$.size").value(2))
                .andExpect(jsonPath("$.totalElements").value(2))
                .andExpect(jsonPath("$.totalPages").value(1))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"))
                .andExpect(header().string("Content-Type", "application/json"));
    }

    @Test
    @DisplayName("GET /api/products/{id}")
    void testGetOneProductSuccessful() throws Exception{
        ProductDTO product = new ProductDTO();
        product.setName("Book1");
        product.setPrice(100);
        product.setCategory(ProductEntity.Category.COMIC);

        when(productService.getProduct(anyLong()))
                .thenReturn(product);

        mockMvc.perform(get("/api/products/{id}", 1L)
                        .header("Origin", "http://localhost:5173"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Book1"))
                .andExpect(jsonPath("$.price").value(100))
                .andExpect(jsonPath("$.category").value("COMIC"))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"))
                .andExpect(header().string("Content-Type", "application/json"));
    }

    @Test
    @DisplayName("POST /api/products")
    void testCreateProductSuccessful() throws Exception{
        ProductDTO request = new ProductDTO(
                "abc",
                10.0,
                10,
                "this is a description",
                ProductEntity.Category.COMIC
        );
        request.setImgBase64("test-img-data");

        ProductDTO newProduct = new ProductDTO(
                "abc",
                10.0,
                10,
                "this is a description",
                ProductEntity.Category.COMIC
        );
        newProduct.setImgBase64("test-img-data");

        when(productService.createProduct(any(ProductDTO.class)))
                .thenReturn(newProduct);

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header("Origin", "http://localhost:5173"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("abc"))
                .andExpect(jsonPath("$.price").value(10.0))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"))
                .andExpect(header().string("Content-Type", "application/json"));
    }

    @Test
    @DisplayName("PUT /api/products/{id}")
    void testUpdateProductSuccessful() throws Exception{
        ProductDTO request = new ProductDTO(
                "ABC_updated",
                10.0,
                10,
                "this is a updated description",
                ProductEntity.Category.COMIC
        );
        request.setImgBase64("test-img-data");

        ProductDTO updatedProduct = new ProductDTO(
                "ABC_updated",
                10.0,
                10,
                "this is a updated description",
                ProductEntity.Category.COMIC
        );
        updatedProduct.setImgBase64("test-img-data");

        when(productService.updateProduct(anyLong() ,any(ProductDTO.class)))
                .thenReturn(updatedProduct);

        mockMvc.perform(put("/api/products/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .header("Origin", "http://localhost:5173"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("ABC_updated"))
                .andExpect(jsonPath("$.description").value("this is a updated description"))
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"))
                .andExpect(header().string("Content-Type", "application/json"));
    }

    @Test
    @DisplayName("DELETE /api/products/{id}")
    void testDeleteProductSuccessful() throws Exception{
        mockMvc.perform(delete("/api/products/{id}", 1L)
                        .header("Origin", "http://localhost:5173"))
                .andExpect(status().isNoContent())
                .andExpect(header().string("Access-Control-Allow-Origin", "http://localhost:5173"));

        verify(productService, times(1)).deleteProduct(1L);
    }
}