package com.iit.ewa.groceryhub.model;

import com.iit.ewa.groceryhub.entity.UserInfo;
import lombok.Data;

import java.util.UUID;

@Data
public class CurrentUserSession {

    public CurrentUserSession() {
        this.requestUUID = UUID.randomUUID().toString();
    }

    private String requestUUID;
    private UserInfo userInfo;
}
