package com.flogin.helper;

import com.flogin.dto.ProductDTO;
import com.flogin.entity.ProductEntity;

import java.util.Base64;

public class ProductMapper {

    public static ProductDTO toDTO(ProductEntity entity) {
        ProductDTO dto = new ProductDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setQuantity(entity.getQuantity());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        if (entity.getImgData() != null) {
            dto.setImgBase64(Base64.getEncoder().encodeToString(entity.getImgData()));
        }
        return dto;
    }

    public static ProductEntity toEntity(ProductDTO dto) {
        ProductEntity entity = new ProductEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setPrice(dto.getPrice());
        entity.setQuantity(dto.getQuantity());
        entity.setDescription(dto.getDescription());
        entity.setCategory(dto.getCategory());
        if (dto.getImgBase64() != null) {
            entity.setImgData(Base64.getDecoder().decode(dto.getImgBase64()));
        }
        return entity;
    }
}
