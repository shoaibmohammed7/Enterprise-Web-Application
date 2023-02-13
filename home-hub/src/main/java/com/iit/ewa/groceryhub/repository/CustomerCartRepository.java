package com.iit.ewa.groceryhub.repository;

import com.iit.ewa.groceryhub.entity.CustomerCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CustomerCartRepository extends JpaRepository<CustomerCart, Integer> {
    @Query("select c from CustomerCart c where c.addedBy.id = :userId")
    List<CustomerCart> getCustomerCart(Integer userId);

    @Query("select c from CustomerCart c where c.addedBy.id = :userId and c.grocery.id = :groceryId")
    CustomerCart getCustomerCartItem(Integer userId, Integer groceryId);

    @Modifying
    @Query("delete from CustomerCart c where c.addedBy.id = :userId")
    void deleteCart(Integer userId);
}