package com.flogin.service;

import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;
import com.flogin.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("Product service Mock tests")
class ProductServiceMockTest {
    @InjectMocks
    private ProductService service;

    @Mock
    private ProductRepository mockRepository;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Mock: get product successful")
    void testGetProduct(){
        ProductEntity entity = new ProductEntity(
                1,
                "abc",
                10.0,
                10,
                "this is a description",
                ProductEntity.Category.COMIC
        );

        when(mockRepository.findById(any(Long.class))).thenReturn(Optional.of(entity));
        ProductDTO result = service.getProduct(1);

        assertNotNull(result);
        verify(mockRepository, times(1)).findById(any(Long.class));
    }
}