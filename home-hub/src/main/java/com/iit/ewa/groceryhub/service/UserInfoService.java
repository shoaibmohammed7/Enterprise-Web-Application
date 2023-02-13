package com.iit.ewa.groceryhub.service;

import com.iit.ewa.groceryhub.entity.UserInfo;
import com.iit.ewa.groceryhub.repository.UserInfoRepository;
import com.iit.ewa.groceryhub.security.UserSessionService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserInfoService {

    private UserInfoRepository userInfoRepository;
    private UserSessionService session;

    public UserInfo getUserInfo() {
        return userInfoRepository.findById(session.getUserId()).orElseThrow();
    }

    public UserInfo createUser(UserInfo userInfo) {
        userInfo = userInfoRepository.save(userInfo);
        return userInfo;
    }

    public List<UserInfo> customerSuggestions(String name) {
        return userInfoRepository.findAllByRoleEqualsAndNameStartsWith("Customer",name);
    }
}
