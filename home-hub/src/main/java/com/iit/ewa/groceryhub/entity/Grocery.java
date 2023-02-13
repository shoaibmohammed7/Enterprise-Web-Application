package com.iit.ewa.groceryhub.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Grocery implements Cloneable, Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String name;
    @Column(columnDefinition="text")
    private String description;
    private Double price;
    private String category;
    private Integer discount;
    private Double rating;
    private String imageUrl;
    private Integer availableCount;
    private LocalDateTime created_date;

    @ManyToOne
    private Stores store;

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

