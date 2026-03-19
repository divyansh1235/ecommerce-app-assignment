package com.ecommerce.ecommerce.controller;

import com.ecommerce.ecommerce.dto.AddToCartRequest;
import com.ecommerce.ecommerce.dto.UpdateQuantityRequest;
import com.ecommerce.ecommerce.model.CartItem;
import com.ecommerce.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {
    private final CartService cartService;
    @GetMapping
    public ResponseEntity<List<CartItem>>getCart()
    {
        return ResponseEntity.ok(cartService.getCartItems());
    }
    @PostMapping
    public ResponseEntity<CartItem> addItem(@RequestBody AddToCartRequest req)
    {
        return ResponseEntity.ok(cartService.addToCart(req.getProductId(),req.getQuantity()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateItem(
            @PathVariable Long id,
            @RequestBody UpdateQuantityRequest req) {

        return ResponseEntity.ok(
                cartService.updateQuantity(id, req.getQuantity())
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeItem(@PathVariable Long id) {
        cartService.removeFromCart(id);
        return ResponseEntity.noContent().build();
    }
}
