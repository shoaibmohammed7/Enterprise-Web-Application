package com.iit.ewa.groceryhub.security;

import com.iit.ewa.groceryhub.entity.UserInfo;
import com.iit.ewa.groceryhub.model.CurrentUserSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Slf4j
@Component
@RequestScope
public class UserSessionService {
    private ThreadLocal<CurrentUserSession> userLocal = new ThreadLocal<>();

    public Integer getUserId() {
        log.debug("getUserId: START");
        CurrentUserSession session = userLocal.get();
        if (session != null && session.getUserInfo() != null) {
            log.debug("session: " + session);
            return session.getUserInfo().getId();
        }
        return null;
    }

    public UserInfo getUserInfo() {
        log.debug("getUserInfo: START");
        CurrentUserSession session = userLocal.get();
        if (session != null) {
            log.debug("session: " + session);
            return session.getUserInfo();
        }
        throw new RuntimeException("User info not fount");
    }

    public void initSession(UserInfo details) {
        if (details == null) {
            return;
        }
        CurrentUserSession session = userLocal.get();
        if (session == null) {
            session = new CurrentUserSession();
            userLocal.set(session);
        }
        session.setUserInfo(details);
        log.debug("initSession session: " + session);
    }
}
