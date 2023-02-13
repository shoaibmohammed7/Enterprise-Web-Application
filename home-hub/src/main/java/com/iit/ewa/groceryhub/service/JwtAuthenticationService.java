/*
    Copyright (c) 2021 PySphere Technologies, LLP.
    All rights reserved. Patents pending.
    Creation Date: 25-08-2021
    Responsible: Shivam Chaudhary
*/
package com.iit.ewa.groceryhub.service;

import com.iit.ewa.groceryhub.entity.UserInfo;
import com.iit.ewa.groceryhub.model.JwtRequest;
import com.iit.ewa.groceryhub.model.JwtResponse;
import com.iit.ewa.groceryhub.repository.UserInfoRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Data
@AllArgsConstructor
@Slf4j
public class JwtAuthenticationService {
    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final UserDetailsService jwtUserDetailsService;

    private final UserInfoRepository userLoginRepository;

    public JwtResponse authenticateCreateToken(
            JwtRequest request) throws Exception {
        JwtResponse jwtResponse;
        String username =
                request.getUsername().trim().toLowerCase();
        String password = request.getPassword().trim();
        try {
            final UserDetails userDetails =
                    jwtUserDetailsService.loadUserByUsername(username);
            if (null == userDetails) {
                log.error("Login : Email is not registered with us.");
                throw new Exception("Email is not registered with us.");
            }
            authenticate(username, password);

            UserInfo userLogin =
                    userLoginRepository.findByEmail(userDetails.getUsername());

            if(userLogin == null) {
                throw new Exception("Invalid credentials");
            }
            final String token =
                    jwtTokenUtil.generateToken(userDetails, userLogin);
            jwtResponse = new JwtResponse(token, userLogin);
            return jwtResponse;
        } catch (Exception e) {
            log.error("Unrecognized login credentials", e);
            throw new Exception("Unrecognized login credentials.");
        }
    }

    private void authenticate(String username, String password)
            throws Exception {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,
                    password
            ));
        } catch (DisabledException e) {
            throw new Exception("This login is Debarred", e);
        } catch (BadCredentialsException e) {
            throw new Exception("Invalid Credentials", e);
        }

    }
}
