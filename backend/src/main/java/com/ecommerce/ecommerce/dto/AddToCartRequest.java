package com.ecommerce.ecommerce.dto;

import lombok.Data;

@Data
public class AddToCartRequest {
private  Long productId;
private Integer quantity;

}
