package com.ecommerce.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private LocalDateTime orderDate;
    private Double totalAmount;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="order_id")
    private List<OrderItem> items;


}
