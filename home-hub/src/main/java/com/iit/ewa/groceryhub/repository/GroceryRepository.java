package com.iit.ewa.groceryhub.repository;

import com.iit.ewa.groceryhub.entity.Grocery;
import com.iit.ewa.groceryhub.model.ChartPoint;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface GroceryRepository extends JpaRepository<Grocery, Integer> {


    @Query("select g from Grocery g where (g.category = :category or :category is null) and g.discount >= :discount and (g.rating >= :rating or g.rating is null)  and (:storeId is null or g.store.id = :storeId)")
    List<Grocery> getGroceries(String category, double rating, int discount, String storeId, Sort by);

    @Query("Select new com.iit.ewa.groceryhub.model.ChartPoint(g.name, g.rating) from Grocery g order by g.rating desc NULLS LAST ")
    List<ChartPoint> topRated();

    @Query("select g from Grocery g where g.created_date between :startDate and :endDate order by g.created_date desc")
    List<Grocery> recentlyAdded(LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT g FROM Grocery g where g.name like %:keyword%")
    public List<Grocery> search(@Param("keyword") String keyword);
}
