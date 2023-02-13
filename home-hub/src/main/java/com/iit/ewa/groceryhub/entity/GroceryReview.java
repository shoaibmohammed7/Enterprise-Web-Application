package com.iit.ewa.groceryhub.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "grocery_review")
@Data
public class GroceryReview {

    @Id
    private String id;

    private String review;

    private int rating;
    private double price;

    private int groceryId;
    private String groceryName;
    private String storeId;
    private String storeName;
    private int userId;
    private String userName;
    private String city;
    private String zipcode;

    @Transient
    private int count;
}