package com.iit.ewa.groceryhub.repository;

import com.iit.ewa.groceryhub.entity.CustomerOrdersDetails;
import com.iit.ewa.groceryhub.entity.Grocery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepository extends JpaRepository<CustomerOrdersDetails, Integer> {

    @Query("select co.grocery from CustomerOrdersDetails co where co.order.id in (select o.order.id from CustomerOrdersDetails o where o.grocery.id = :groceryId)")
    List<Grocery> getRecommendedGrocery(Integer groceryId);
}
