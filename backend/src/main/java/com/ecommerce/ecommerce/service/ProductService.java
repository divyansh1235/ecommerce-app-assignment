package com.ecommerce.ecommerce.service;

import com.ecommerce.ecommerce.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProductById(Long Id);

    List<Product> searchProducts(String query);

    List<Product> getByCategory(String category);
}
