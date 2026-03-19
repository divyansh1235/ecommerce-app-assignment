package com.ecommerce.ecommerce.repository;

import com.ecommerce.ecommerce.model.CartItem;
import com.ecommerce.ecommerce.model.Product;
import jakarta.persistence.metamodel.SingularAttribute;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
List<Product> findByCategoryIgnoreCase(String category);
List <Product> findByNameContainingIgnoreCase(String name);

  



}
