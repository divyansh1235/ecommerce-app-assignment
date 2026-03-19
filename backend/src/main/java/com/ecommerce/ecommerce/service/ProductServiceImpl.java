package com.ecommerce.ecommerce.service;

import com.ecommerce.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;

    @Override
    public List<Product>getAllProducts()
    {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id)
    {
        return (Product) productRepository.findById(id)
                .orElseThrow(()->
                        new ResourceNotFoundException("Product not found with id "+ id));
    }
   @Override
   public List<Product> searchProducts(String query)
   {
       return productRepository.findByNameContainingIgnoreCase(query);
   }

   @Override
   public List<Product> getByCategory(String category)
   {
       return productRepository.findByCategoryIgnoreCase(category);
   }
}
