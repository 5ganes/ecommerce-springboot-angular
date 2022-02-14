package com.ganesh.ecommerce.service;

import com.ganesh.ecommerce.dto.PaymentInfo;
import com.ganesh.ecommerce.dto.Purchase;
import com.ganesh.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;

}
