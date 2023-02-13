package com.iit.ewa.groceryhub.resources;

import com.iit.ewa.groceryhub.entity.UserInfo;
import com.iit.ewa.groceryhub.service.UserInfoService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserResource {

    private UserInfoService userInfoService;

    @GetMapping
    public UserInfo getUserInfo() {
        return userInfoService.getUserInfo();
    }

    @PostMapping("/create")
    public UserInfo createCustomerUser(@RequestBody UserInfo info) {
        return userInfoService.createUser(info);
    }

    @PostMapping("/getSuggestions")
    public List<UserInfo> getCustomerSuggestions(@RequestBody String name){
        return userInfoService.customerSuggestions(name);
    }
}
