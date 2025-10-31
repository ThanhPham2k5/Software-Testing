package com.flogin.service;

import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;
import com.flogin.helper.ProductMapper;
import com.flogin.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository){
        this.repository = repository;
    }

    public ProductDTO createProduct(ProductDTO dto){
        validateProduct(dto);
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
        validateProduct(updated);
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

//    public ProductDTO updateImg(long id, String base64){
//        byte[] bytes = Base64.getDecoder().decode(base64);
//        ProductEntity entity = repository.findById(id).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
//        );
//
//        entity.setImgData(bytes);
//        repository.save(entity);
//        return ProductMapper.toDTO(entity);
//    }

    public void validateProduct(ProductDTO dto){
        if(dto.getName() == null || dto.getName().isBlank())
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Product's name cannot be empty"
            );

        if(dto.getPrice() < 0)
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Product's price can't be negative"
            );

        if(dto.getQuantity() < 0)
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Product's quantity can't be negative"
            );

        if(dto.getDescription() == null || dto.getDescription().isBlank())
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Product's description cannot be empty"
            );

        if(dto.getCategory().toString() == null || dto.getCategory().toString().isBlank())
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Product's category cannot be empty"
            );

//        if(dto.getImgBase64() == null || dto.getImgBase64().isBlank())
//            throw new ResponseStatusException(
//                    HttpStatus.BAD_REQUEST, "Image cannot be blank"
//            );

    }

    public void deleteProduct(long id) {
        ProductEntity existing = repository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        existing.setDeleted(true);
        repository.save(existing);
    }
}
