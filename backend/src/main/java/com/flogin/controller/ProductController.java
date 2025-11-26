package com.flogin.controller;


import com.flogin.dto.ProductDTO;
import com.flogin.service.ProductService;
import com.flogin.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService service;
    private final JwtUtil jwtUtil;


    public ProductController(ProductService service, JwtUtil jwtUtil){
        this.jwtUtil = jwtUtil;
        this.service = service;
    }

    private void validateToken(HttpServletRequest request){
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing token");
        }

        String token = header.substring(7); // remove "Bearer "
        if (!jwtUtil.validateToken(token)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
        }
    }

    @PostMapping
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO dto, HttpServletRequest request){
        validateToken(request);
        return ResponseEntity.ok(service.createProduct(dto));
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> get(@PathVariable long id, HttpServletRequest request){
        validateToken(request);
        return ResponseEntity.ok(service.getProduct(id));
    }


    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            HttpServletRequest request){
        validateToken(request);
        return ResponseEntity.ok(service.getAllProducts(page, size));
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable long id, @RequestBody ProductDTO dto, HttpServletRequest request){
        validateToken(request);
        return ResponseEntity.ok(service.updateProduct(id, dto));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id, HttpServletRequest request){
        validateToken(request);
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
