package com.iit.ewa.groceryhub.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "grocery_stores")
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GroceryStores {
    @Id
    private String id;
    private String name;
    private String address;
    private String imageUrl;
    private String phone;
    private String latitude;
    private String longitude;
    private Double rating;
}