package com.iit.ewa.groceryhub.resources;

import com.iit.ewa.groceryhub.entity.CustomerOrders;
import com.iit.ewa.groceryhub.entity.CustomerOrdersDetails;
import com.iit.ewa.groceryhub.entity.Grocery;
import com.iit.ewa.groceryhub.service.GroceryService;
import com.iit.ewa.groceryhub.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.util.List;

@RestController()
@RequestMapping("/orders")
@AllArgsConstructor
@Slf4j
public class OrderResource {

    private OrderService orderService;

    @GetMapping("/viewCustomerOrders/{userId}")
    public List<CustomerOrders> getCustomerOrders(@PathVariable Integer userId) {
        return orderService.getCustomerOrders(userId);
    }

    @GetMapping
    public List<CustomerOrders> getOrder() {
    	log.info("Getting orders:");
    	log.info("Getting all grocessiries");
    	try {
    	InetAddress address = InetAddress.getLocalHost();
        String ip = address.getHostAddress();
        log.info("IP Address = " + ip);
    	} catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return orderService.getOrders();
    }

    @GetMapping("/{id}")
    public CustomerOrders getOrder(@PathVariable Integer id) {
        return orderService.getOrder(id);
    }

    @PostMapping
    public CustomerOrders placeOrder(@RequestBody CustomerOrders order) {
        return orderService.placeOrder(order);
    }


    @GetMapping("/{groceryId}/recommendation")
    public List<Grocery> getRecommendedGrocery(@PathVariable Integer groceryId) {
        return orderService.getRecommendedGrocery(groceryId);
    }

    @PostMapping("/{id}/cancel")
    public void cancelOrder(@PathVariable Integer id) {
        orderService.cancelOrder(id);
    }

    @PostMapping("/cancelOrderGrocery/{prodOrderId}/{orderId}")
    public void cancelOrderGrocery(@PathVariable Integer prodOrderId, @PathVariable Integer orderId) {
        orderService.cancelOrderGrocery(prodOrderId);
        CustomerOrders order = orderService.getOrder(orderId);
        double total = 0;
        for (CustomerOrdersDetails details : order.getOrderDetails()) {
            total = details.getQuantity() * details.getPrice();
        }
        order.setTotalPrice(total);
        orderService.updateOrder(order);
    }

    @PostMapping("/updateOrder/{orderId}/{updatedDate}")
    public void updateOrderDeliveryDate(@PathVariable Integer orderId, @PathVariable String updatedDate){
        System.out.println(orderId);
        System.out.println(updatedDate);
        LocalDateTime deliveryDate = LocalDateTime.parse(updatedDate);
        orderService.updateOrderDetails(orderId, deliveryDate);
    }
}
