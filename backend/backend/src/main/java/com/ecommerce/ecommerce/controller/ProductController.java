package com.ecommerce.ecommerce.controller;

import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class ProductController {
private final ProductService productService;
@GetMapping
    public ResponseEntity<List<Product>> getAll(
    @RequestParam(required = false) String search,
    @RequestParam(required = false) String category){
     if(search!=null && !search.isBlank())
     {
         return ResponseEntity.ok(productService.searchProducts(search));
     }
     if(category!=null && !category.isBlank())
     {
         return ResponseEntity.ok(productService.getByCategory(category));
     }
    return ResponseEntity.ok(productService.getAllProducts());
}

@GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
    return ResponseEntity.ok(productService.getProductById(id));
}

}
