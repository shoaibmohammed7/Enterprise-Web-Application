package com.iit.ewa.groceryhub.repository;

import com.iit.ewa.groceryhub.entity.Stores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Stores, Integer> {


    @Query(nativeQuery = true, value = "select * from stores order by ST_Distance (where_is, ST_Buffer(ST_GeomFromText(:geo), 50)) limit 1;")
    Stores getNearMeStores(String geo);

    @Query(nativeQuery = true, value = "select * from stores where ST_Distance (where_is, ST_Buffer(ST_GeomFromText(:geo), 50)) < 500 order by ST_Distance (where_is, ST_Buffer(ST_GeomFromText(:geo), 1500)) , (rating/review_count);")
    List<Stores> getNearByStores(String geo);
    
    @Query(nativeQuery = true, value ="SELECT * FROM stores g where g.name like %:keyword%")
    List<Stores> searchStores(@Param("keyword") String keyword);
}
