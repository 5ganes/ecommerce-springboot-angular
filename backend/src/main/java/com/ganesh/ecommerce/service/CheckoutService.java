package com.ganesh.ecommerce.service;

import com.ganesh.ecommerce.dto.Purchase;
import com.ganesh.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
