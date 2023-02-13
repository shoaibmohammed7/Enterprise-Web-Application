package com.iit.ewa.groceryhub.repository;

import com.iit.ewa.groceryhub.entity.UserInfo;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {

    UserInfo findByEmail(String username);

    List<UserInfo> findAllByRoleEqualsAndNameStartsWith(String role, String name);
}
