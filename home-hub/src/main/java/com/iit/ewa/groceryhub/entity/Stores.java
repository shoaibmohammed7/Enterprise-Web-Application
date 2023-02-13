package com.iit.ewa.groceryhub.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.geo.Point;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Stores {
    @Id
    private String id;
    private String name;

    private String imageUrl;
    private boolean closed;
    private int reviewCount;

    private String displayPhone;

    private double distance;

    private String zipCode;
    private String city;

    private String addressLine1;
    private String addressLine2;

    private double latitude;
    private double longitude;
    private double rating;
}

