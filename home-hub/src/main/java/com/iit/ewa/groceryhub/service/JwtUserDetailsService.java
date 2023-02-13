package com.iit.ewa.groceryhub.service;

import com.iit.ewa.groceryhub.entity.UserInfo;
import com.iit.ewa.groceryhub.repository.UserInfoRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {

    private final UserInfoRepository userLoginRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        UserInfo userLogin = userLoginRepository.findByEmail(username);
        if (userLogin != null) {
            try {
                Set<GrantedAuthority> grantedAuthorities = new HashSet(Arrays.asList(new SimpleGrantedAuthority(userLogin.getRole())));

                return new User(
                        userLogin.getEmail(),
                        userLogin.getPassword(),
                        grantedAuthorities
                );
            } catch (Exception e) {
                log.error(e.getMessage());
                throw new UsernameNotFoundException(
                        "User not found with username: " + username);
            }
        } else {
            return null;
        }

    }
}