package com.iit.ewa.groceryhub.resources;

import com.iit.ewa.groceryhub.entity.CustomerCart;
import com.iit.ewa.groceryhub.service.CustomerCartService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/cart")
@AllArgsConstructor
public class CustomerCartResource {
	private CustomerCartService service;

    @GetMapping("/getCartItems/{userId}")
    public List<CustomerCart> getCartItems(@PathVariable Integer userId) {
        return service.getUserCart(userId);
    }

    @PostMapping("/addToCart")
    public CustomerCart addToCart(@RequestBody CustomerCart cartItem) {
        System.out.println("CartItem : " + cartItem);
        return service.addToCart(cartItem);
    }

    @DeleteMapping("/removeCartItem/{id}")
    public void removeCartItem(@PathVariable Integer id) {
        service.removeItem(id);
    }
}
