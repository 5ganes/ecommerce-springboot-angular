package com.ganesh.ecommerce.dto;

import com.ganesh.ecommerce.entity.Address;
import com.ganesh.ecommerce.entity.Customer;
import com.ganesh.ecommerce.entity.Order;
import com.ganesh.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}

