package com.iit.ewa.groceryhub.resources;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/open")
@AllArgsConstructor
public class PublicResource {

    @GetMapping("/test")
    public String getMyPostImage() {
        return "Working";
    }
}
