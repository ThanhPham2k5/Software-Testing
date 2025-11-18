package com.flogin.service;

import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;
import com.flogin.helper.ProductMapper;
import com.flogin.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
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
        newProduct.setImgBase64("test-img-data");

        ProductEntity entity = new ProductEntity(
                1,
                "abc",
                10.0,
                10,
                "this is a description",
                ProductEntity.Category.COMIC
        );

        when(mockRepository.save(any(ProductEntity.class))).thenReturn(entity);

        try(MockedStatic<ProductMapper> mockMapper = mockStatic(ProductMapper.class)) {
            mockMapper.when(() -> ProductMapper.toEntity(any(ProductDTO.class)))
                    .thenReturn(entity);

            mockMapper.when(() -> ProductMapper.toDTO(any(ProductEntity.class)))
                    .thenReturn(newProduct);

            ProductDTO result = service.createProduct(newProduct);

            assertNotNull(result);
            assertEquals("abc", result.getName());
            verify(mockRepository, times(1)).save(any(ProductEntity.class));
        }
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
        updatedProduct.setImgBase64("test-img-data");

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

        try(MockedStatic<ProductMapper> mockMapper = mockStatic(ProductMapper.class)){
            mockMapper.when(() -> ProductMapper.toEntity(any(ProductDTO.class)))
                    .thenReturn(updatedEntity);

            mockMapper.when(() -> ProductMapper.toDTO(any(ProductEntity.class)))
                    .thenReturn(updatedProduct);

            ProductDTO result = service.updateProduct(1, updatedProduct);

            assertNotNull(result);
            assertEquals(updatedProduct.getDescription(), result.getDescription());
            verify(mockRepository, times(1)).findById(any(Long.class));
            verify(mockRepository, times(1)).save(any(ProductEntity.class));
        }
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

    @Test
    @DisplayName("Get All Products test")
    void testGetAll(){
        ProductEntity entity1 = new ProductEntity();
        ProductEntity entity2 = new ProductEntity();
        entity1.setName("Book1");
        entity2.setName("Book2");

        List<ProductEntity> entityList = List.of(entity1, entity2);

        Page<ProductEntity> entityPage = new PageImpl<>(entityList, PageRequest.of(0,2), 2);

        when(mockRepository.findAllByIsDeletedFalse(any(PageRequest.class)))
                .thenReturn(entityPage);

        try(MockedStatic<ProductMapper> mockMapper = mockStatic(ProductMapper.class)){
            ProductDTO dto1 = new ProductDTO();
            ProductDTO dto2 = new ProductDTO();

            dto1.setName("Book1");
            dto2.setName("Book2");

            mockMapper.when(() -> ProductMapper.toDTO(entity1)).thenReturn(dto1);
            mockMapper.when(() -> ProductMapper.toDTO(entity2)).thenReturn(dto2);

            Page<ProductDTO> result = service.getAllProducts(0,2);

            assertNotNull(result);
            assertEquals(2, result.getContent().size());
            assertEquals("Book1", result.getContent().get(0).getName());
            assertEquals("Book2", result.getContent().get(1).getName());

            verify(mockRepository, times(1)).findAllByIsDeletedFalse(any(PageRequest.class));
        }

    }

    @Test
    @DisplayName("Delete Product fail with product not found test")
    void testDeleteProductFailWithNotFound(){
        when(mockRepository.findById(any(Long.class))).thenReturn(Optional.empty());

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.deleteProduct(1)
        );

        assertEquals(HttpStatus.NOT_FOUND, thrown.getStatusCode());
        verify(mockRepository, times(1)).findById(any(Long.class));
    }

    @Test
    @DisplayName("validate product fail with empty name")
    void testValidateFailWithEmptyName(){
        ProductDTO dto = new ProductDTO();
        dto.setName("");
        dto.setPrice(100);
        dto.setQuantity(10);
        dto.setDescription("test description");
        dto.setCategory(ProductEntity.Category.COMIC);
        dto.setImgBase64("test base64");

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Product's name cannot be empty", thrown.getReason());
    }

    @Test
    @DisplayName("validate product fail with null name")
    void testValidateFailWithNullName(){
        ProductDTO dto = new ProductDTO();
        dto.setName(null);
        dto.setPrice(100);
        dto.setQuantity(10);
        dto.setDescription("test description");
        dto.setCategory(ProductEntity.Category.COMIC);
        dto.setImgBase64("test base64");

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Product's name cannot be empty", thrown.getReason());
    }

    @Test
    @DisplayName("validate product fail with negative price")
    void testValidateFailWithNegativePrice(){
        ProductDTO dto = new ProductDTO();
        dto.setName("test name");
        dto.setPrice(-100);
        dto.setQuantity(10);
        dto.setDescription("test description");
        dto.setCategory(ProductEntity.Category.COMIC);
        dto.setImgBase64("test base64");

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Product's price can't be negative", thrown.getReason());
    }


    @Test
    @DisplayName("validate product fail with negative quantity")
    void testValidateFailWithNegativeQuantity(){
        ProductDTO dto = new ProductDTO();
        dto.setName("test name");
        dto.setPrice(100);
        dto.setQuantity(-10);
        dto.setDescription("test description");
        dto.setCategory(ProductEntity.Category.COMIC);
        dto.setImgBase64("test base64");

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Product's quantity can't be negative", thrown.getReason());
    }

    @Test
    @DisplayName("validate product fail with empty description")
    void testValidateFailWithEmptyDescription(){
        ProductDTO dto = new ProductDTO();
        dto.setName("test name");
        dto.setPrice(100);
        dto.setQuantity(10);
        dto.setDescription("");
        dto.setCategory(ProductEntity.Category.COMIC);
        dto.setImgBase64("test base64");

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Product's description cannot be empty", thrown.getReason());
    }

    @Test
    @DisplayName("validate product fail with null description")
    void testValidateFailWithNullDescription(){
        ProductDTO dto = new ProductDTO();
        dto.setName("test name");
        dto.setPrice(100);
        dto.setQuantity(10);
        dto.setDescription(null);
        dto.setCategory(ProductEntity.Category.COMIC);
        dto.setImgBase64("test base64");

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Product's description cannot be empty", thrown.getReason());
    }

    @Test
    @DisplayName("validate product fail with null category")
    void testValidateFailWithNullCategory(){
        ProductDTO dto = new ProductDTO();
        dto.setName("test name");
        dto.setPrice(100);
        dto.setQuantity(10);
        dto.setDescription("test description");
        dto.setCategory(null);
        dto.setImgBase64("test base64");

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Product's category cannot be empty", thrown.getReason());
    }

    @Test
    @DisplayName("validate product fail with empty img data")
    void testValidateFailWithEmptyImgBase64(){
        ProductDTO dto = new ProductDTO();
        dto.setName("test name");
        dto.setPrice(100);
        dto.setQuantity(10);
        dto.setDescription("test description");
        dto.setCategory(ProductEntity.Category.COMIC);
        dto.setImgBase64("");

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Image cannot be blank", thrown.getReason());
    }

    @Test
    @DisplayName("validate product fail with null img data")
    void testValidateFailWithNullImgBase64(){
        ProductDTO dto = new ProductDTO();
        dto.setName("test name");
        dto.setPrice(100);
        dto.setQuantity(10);
        dto.setDescription("test description");
        dto.setCategory(ProductEntity.Category.COMIC);
        dto.setImgBase64(null);

        ResponseStatusException thrown = assertThrows(
                ResponseStatusException.class,
                () -> service.validateProduct(dto)
        );

        assertEquals("Image cannot be blank", thrown.getReason());
    }
}