package com.flogin.dto;

import com.flogin.entity.ProductEntity;

public class ProductDTO {

    private long id;
    private String name;
    private double price;
    private int quantity;
    private String description;

    private ProductEntity.Category category;
    private String imgBase64;

    public ProductDTO() {

    }

    public ProductDTO(long id, String name, double price, int quantity, String description, ProductEntity.Category category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
    }

    public ProductEntity.Category getCategory() {
        return category;
    }

    public void setCategory(ProductEntity.Category category) {
        this.category = category;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImgBase64() {
        return imgBase64;
    }

    public void setImgBase64(String imgBase64) {
        this.imgBase64 = imgBase64;
    }
}
