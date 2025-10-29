package com.flogin.service;

import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;
import com.flogin.helper.ProductMapper;
import com.flogin.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository){
        this.repository = repository;
    }

    public ProductDTO createProduct(ProductDTO dto){
        ProductEntity entity = ProductMapper.toEntity(dto);
        entity.setDeleted(false);
        return ProductMapper.toDTO(repository.save(entity));
    }

    public ProductDTO getProduct(long id){
        ProductEntity entity = repository.findById(id)
                .filter(p->!p.isDeleted())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return ProductMapper.toDTO(entity);
    }

    public Page<ProductDTO> getAllProducts(int atPage, int sizePerPage){
        Page<ProductEntity> entityPage = repository.findAllByIsDeletedFalse(PageRequest.of(atPage, sizePerPage));
        return entityPage.map(ProductMapper::toDTO);
    }

    public ProductDTO updateProduct(long id, ProductDTO updated) {
        ProductDTO existing = getProduct(id);
        existing.setName(updated.getName());
        existing.setPrice(updated.getPrice());
        existing.setQuantity(updated.getQuantity());
        existing.setDescription(updated.getDescription());
        existing.setCategory(updated.getCategory());
        existing.setImgBase64(updated.getImgBase64());
        ProductEntity updatedEntity = repository.save(ProductMapper.toEntity(existing));
        return ProductMapper.toDTO(updatedEntity);
    }

    public void deleteProduct(long id) {
        ProductEntity existing = repository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        existing.setDeleted(true);
        repository.save(existing);
    }
}
