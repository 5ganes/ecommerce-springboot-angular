package com.ganesh.ecommerce.dto;

import lombok.Data;

@Data
public class PaymentInfo {

    private int amount; // converted into lowest/smallest denomination of any currency(cents in US dollars)
    private String currency;
    private String receiptEmail;

}
