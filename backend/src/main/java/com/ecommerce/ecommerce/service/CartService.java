package com.ecommerce.ecommerce.service;

import com.ecommerce.ecommerce.model.CartItem;

import java.util.List;

public interface CartService {
    CartItem addToCart(Long productId, Integer quantity);

    CartItem updateQuantity(Long cartItemId, Integer quantity);

    void removeFromCart(Long cartItemId);

    void clearCart();

    List<CartItem> getCartItems();
}
