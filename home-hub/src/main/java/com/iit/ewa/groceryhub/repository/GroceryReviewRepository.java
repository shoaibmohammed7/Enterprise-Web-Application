package com.iit.ewa.groceryhub.repository;

import com.iit.ewa.groceryhub.entity.GroceryReview;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroceryReviewRepository extends MongoRepository<GroceryReview, String> {

    List<GroceryReview> findAllByGroceryId(int groceryId);
}