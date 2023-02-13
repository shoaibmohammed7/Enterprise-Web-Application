package com.iit.ewa.groceryhub.helper;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@Component
public class RequestHelper {
    public String getTokenFromRequest(HttpServletRequest request) {
        String token = null;
        Cookie cookieToken = WebUtils.getCookie(request, "token");
        if (cookieToken != null) {
            token = cookieToken.getValue();
        } else {
            String bearerToken = request.getHeader("Authorization");
            if (StringUtils.hasText(bearerToken) && (bearerToken.startsWith("Bearer ")
                    || bearerToken.startsWith("bearer "))) {
                token = bearerToken.substring(7);
            }
        }
        return token;
    }
}
