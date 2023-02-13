package com.iit.ewa.groceryhub.repository;

import com.iit.ewa.groceryhub.entity.CustomerOrders;
import com.iit.ewa.groceryhub.model.ChartPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<CustomerOrders, Integer> {
    @Query("select c from CustomerOrders c where c.orderedBy.id = :id order by c.purchasedDate")
    List<CustomerOrders> findAllByUserId(Integer id);

    @Query("select c.purchasedDate, count(c.purchasedDate) from CustomerOrders c group by c.purchasedDate order by c.purchasedDate")
    List<Object[]> getOrderTrend();


    @Query("select c.purchasedDate, sum(c.totalPrice) from CustomerOrders c group by c.purchasedDate order by c.purchasedDate")
    List<Object[]> getOrderSalesTrend();


    @Query("select new com.iit.ewa.groceryhub.model.ChartPoint(c.zipCode, count(c.zipCode)) from CustomerOrders c group by c.zipCode order by count(c.zipCode) desc")
    List<ChartPoint> getOrderByPinCode();
}
