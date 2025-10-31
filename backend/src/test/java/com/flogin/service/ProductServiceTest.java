package com.flogin.service;

import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;
import com.flogin.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@DisplayName("Product service unit tests")
class ProductServiceTest {
    @InjectMocks
    private ProductService service;

    @Mock
    private ProductRepository mockRepository;

    @BeforeEach
    void setup(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("create product successful")
    void testCreateProduct(){
        ProductDTO newProduct = new ProductDTO(
                "abc",
                10.0,
                10,
                "this is a description",
                ProductEntity.Category.COMIC
        );
        ProductEntity entity = new ProductEntity(
                1,
                "abc",
                10.0,
                10,
                "this is a description",
                ProductEntity.Category.COMIC
        );

        when(mockRepository.save(any(ProductEntity.class))).thenReturn(entity);

        ProductDTO result = service.createProduct(newProduct);

        assertNotNull(result);
        assertEquals("abc", result.getName());
        verify(mockRepository, times(1)).save(any(ProductEntity.class));
    }

    @Test
    @DisplayName("get product successful")
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

    @Test
    @DisplayName("Update Product successful")
    void testUpdateProduct(){
        ProductDTO updatedProduct = new ProductDTO(
                "abc",
                10.0,
                10,
                "updated description",
                ProductEntity.Category.COMIC
        );
        ProductEntity entity = new ProductEntity(
                1,
                "abc",
                10.0,
                10,
                "this is a description",
                ProductEntity.Category.COMIC
        );
        ProductEntity updatedEntity = new ProductEntity(
                1,
                "abc",
                10.0,
                10,
                "updated description",
                ProductEntity.Category.COMIC
        );

        when(mockRepository.findById(any(Long.class))).thenReturn(Optional.of(entity));
        when(mockRepository.save(any(ProductEntity.class))).thenReturn(updatedEntity);

        ProductDTO result = service.updateProduct(1, updatedProduct);

        assertNotNull(result);
        assertEquals(updatedProduct.getDescription(), result.getDescription());
        verify(mockRepository, times(1)).findById(any(Long.class));
        verify(mockRepository, times(1)).save(any(ProductEntity.class));
    }

    @Test
    @DisplayName("Delete Product test")
    void testDeleteProduct(){
        ProductEntity entity = new ProductEntity();

        when(mockRepository.findById(any(Long.class))).thenReturn(Optional.of(entity));
        ArgumentCaptor<ProductEntity> captor = ArgumentCaptor.forClass(ProductEntity.class);

        service.deleteProduct(1);

        verify(mockRepository, times(1)).findById(any(Long.class));
        verify(mockRepository, times(1)).save(captor.capture());

        ProductEntity capturedEntity = captor.getValue();
        assertTrue(capturedEntity.isDeleted());
    }


}