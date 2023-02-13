package com.iit.ewa.groceryhub.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CustomerOrders {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @DateTimeFormat(pattern="dd/MM/yyyy")
    private LocalDateTime purchasedDate;
    private LocalDateTime deliveryDate;
    @OneToOne
    private UserInfo orderedBy;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String zipCode;
    private String state;
    private String paymentMethod;
    private String cardHolderName;
    private String cardNumber;
    private String cardExpiry;
    private String cardCvv;
    private String deliveryType;
    private double totalPrice;

    @JsonManagedReference
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<CustomerOrdersDetails> orderDetails;
    private OrderStatus orderStatus;
}

