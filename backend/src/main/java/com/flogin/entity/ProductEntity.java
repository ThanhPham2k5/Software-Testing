package com.flogin.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private double price;
    private int quantity;
    private String description;

//    @Column(name = "is_deleted", nullable = false)
    private boolean isDeleted = false;
    @Lob
    private byte[] imgData;


    public enum Category{
        MANGA,
        NOVEL,
        NOTEBOOK,
        ROMANCE,
        COMIC
    }

    @Enumerated(EnumType.STRING)
    private Category category;

    public  ProductEntity(){
    }

    public ProductEntity(long id, String name, double price, int quantity, String description, Category category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
    }


    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getDescription() {
        return description;
    }

    public Category getCategory() {
        return category;
    }

    public byte[] getImgData() {
        return imgData;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public void setImgData(byte[] imgData) {
        this.imgData = imgData;
    }


}
