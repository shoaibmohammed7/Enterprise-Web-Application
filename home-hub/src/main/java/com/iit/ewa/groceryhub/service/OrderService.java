package com.iit.ewa.groceryhub.service;

import com.iit.ewa.groceryhub.entity.CustomerOrders;
import com.iit.ewa.groceryhub.entity.Grocery;
import com.iit.ewa.groceryhub.repository.CustomerCartRepository;
import com.iit.ewa.groceryhub.repository.OrderDetailsRepository;
import com.iit.ewa.groceryhub.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;
    private OrderDetailsRepository orderDetailsRepository;
    private CustomerCartRepository cartRepo;

    public List<CustomerOrders> getOrders() {
        return orderRepository.findAll();
    }

    public List<CustomerOrders> getCustomerOrders(Integer userId) {
        return orderRepository.findAllByUserId(userId);
    }

    public CustomerOrders getOrder(Integer id) {
        return orderRepository.findById(id).get();
    }

    @Transactional
    public CustomerOrders placeOrder(CustomerOrders order) {

        order.setPurchasedDate(LocalDateTime.now().truncatedTo(ChronoUnit.DAYS));
        order.getOrderDetails().forEach(d -> d.setOrder(order));
        cartRepo.deleteCart(order.getOrderedBy().getId());
        return orderRepository.save(order);
    }

    public CustomerOrders updateOrder(CustomerOrders order) {
        return orderRepository.save(order);
    }

    public void cancelOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    public void cancelOrderGrocery(Integer id) {
        orderDetailsRepository.deleteById(id);
    }

    public List<Grocery> getRecommendedGrocery(Integer groceryId) {
        return orderDetailsRepository.getRecommendedGrocery(groceryId)
                .stream()
                .filter(d -> !Objects.equals(d.getId(), groceryId))
                .collect(Collectors.toList());
    }

    public void updateOrderDetails(Integer orderId , LocalDateTime updatedDate){
        CustomerOrders order =  orderRepository.findById(orderId).get();
        order.setDeliveryDate(updatedDate);
        orderRepository.save(order);
    }
}
