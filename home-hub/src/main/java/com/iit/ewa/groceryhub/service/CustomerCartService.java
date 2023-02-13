package com.iit.ewa.groceryhub.service;
import com.iit.ewa.groceryhub.entity.CustomerCart;
import com.iit.ewa.groceryhub.repository.CustomerCartRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class CustomerCartService {
    private CustomerCartRepository cartRepo;

    public List<CustomerCart> getUserCart(Integer userId){
        return cartRepo.getCustomerCart(userId);
    }

    public CustomerCart addToCart(CustomerCart cart){
        CustomerCart cartItem = cartRepo.getCustomerCartItem(cart.getAddedBy().getId(), cart.getGrocery().getId());
        if (cartItem == null) {
            return cartRepo.save(cart);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            return cartRepo.save(cartItem);
        }
    }

    public void removeItem(Integer id){
        cartRepo.deleteById(id);
    }
}
