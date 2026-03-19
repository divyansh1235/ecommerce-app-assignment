package com.ecommerce.ecommerce.service;

import com.ecommerce.ecommerce.exception.BadRequestException;
import com.ecommerce.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.ecommerce.model.CartItem;
import com.ecommerce.ecommerce.model.Order;
import com.ecommerce.ecommerce.model.OrderItem;
import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.repository.OrderRepository;
import com.ecommerce.ecommerce.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final ProductRepository productRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order placeOrder() {
        List<CartItem> cartItems = cartService.getCartItems();
        if (cartItems.isEmpty()) {
            throw new BadRequestException("Cannot place order: cart is empty");
        }

        for (CartItem ci : cartItems) {
            Product product = productRepository.findById(ci.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Product not found: " + ci.getProduct().getId()));

            if (product.getStock() < ci.getQuantity()) {
                throw new BadRequestException(
                        "Insufficient stock for \"" + product.getName() + "\"." +
                                " Available: " + product.getStock() +
                                ", Requested: " + ci.getQuantity()
                );
            }
        }

        List<OrderItem> orderItems = cartItems.stream()
                .map(ci -> OrderItem.builder()
                        .product(ci.getProduct())
                        .quantity(ci.getQuantity())
                        .priceAtPurchase(ci.getProduct().getPrice())
                        .build())
                .collect(Collectors.toList());


        double total = orderItems.stream()
                .mapToDouble(i -> i.getPriceAtPurchase() * i.getQuantity())
                .sum();


        Order order = Order.builder()
                .orderDate(LocalDateTime.now())
                .totalAmount(total)
                .status("PLACED")
                .items(orderItems)
                .build();

        Order saved = orderRepository.save(order);

        for (CartItem ci : cartItems) {
            int rowsUpdated = productRepository.decreaseStock(
                    ci.getProduct().getId(), ci.getQuantity());

            if (rowsUpdated == 0) {
                throw new BadRequestException(
                        "Stock update failed for \"" + ci.getProduct().getName() +
                                "\". It may have been bought by someone else.");
            }
        }


        cartService.clearCart();

        return saved;
    }
}