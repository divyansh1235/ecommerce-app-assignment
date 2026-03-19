package com.ecommerce.ecommerce.service;

import com.ecommerce.ecommerce.model.Order;
import jakarta.transaction.Transactional;

import java.util.List;

public interface OrderService {

    List<Order> getAllOrders();

    @Transactional
    Order placeOrder();
}
