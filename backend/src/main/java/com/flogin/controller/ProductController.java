package com.flogin.controller;


import com.flogin.dto.ProductDTO;
import com.flogin.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO dto){
        return ResponseEntity.ok(service.createProduct(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> get(@PathVariable long id){
        return ResponseEntity.ok(service.getProduct(id));
    }

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size){
        return ResponseEntity.ok(service.getAllProducts(page, size));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable long id, @RequestBody ProductDTO dto){
        return ResponseEntity.ok(service.updateProduct(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
