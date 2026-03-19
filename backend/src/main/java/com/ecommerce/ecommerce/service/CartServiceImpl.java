package com.ecommerce.ecommerce.service;

import com.ecommerce.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.ecommerce.model.CartItem;
import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.repository.CartItemRepository;
import com.ecommerce.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    @Override
    public CartItem addToCart(Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found: " + productId));

        CartItem item = CartItem.builder()
                .Product(product)
                .Quantity(quantity)
                .build();

        return cartItemRepository.save(item);
    }

    @Override
    public CartItem updateQuantity(Long cartItemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cart item not found: " + cartItemId));

        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public void clearCart() {
        cartItemRepository.deleteAll();
    }

    @Override
    public List<CartItem> getCartItems() {
        return cartItemRepository.findAll();
    }
}
