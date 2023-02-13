package com.iit.ewa.groceryhub.resources;

import com.iit.ewa.groceryhub.entity.Grocery;
import com.iit.ewa.groceryhub.entity.GroceryReview;
import com.iit.ewa.groceryhub.service.GroceryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/groceries")
@AllArgsConstructor
public class GroceryResource {

    private GroceryService groceryService;

    @GetMapping
    public List<Grocery> getGroceries(@RequestParam(required = false) String category,
                                      @RequestParam(required = false) String storeId,
                                      @RequestParam(defaultValue = "desc") String sortBy,
                                      @RequestParam(defaultValue = "0") double rating,
                                      @RequestParam(defaultValue = "0") int discount) {
        category = category == null || category.isEmpty() ? null : category;
        return groceryService.getGroceries(category, sortBy, rating, discount, storeId);
    }

    @GetMapping("/recentlyAdded")
    public List<Grocery> recentlyAdded() {
        return groceryService.recentlyAdded();
    }

    @GetMapping("/reviews")
    public List<Grocery> dataFilter(@RequestParam(required = false) String storeId,
                                    @RequestParam(defaultValue = "desc") String sortBy,
                                    @RequestParam(defaultValue = "0") int rating,
                                    @RequestParam(defaultValue = "0") int discount) {
        return groceryService.reviewDataFilter(sortBy, rating, discount, storeId);
    }

    @GetMapping("/{id}")
    public Grocery getGrocery(@PathVariable Integer id) {
        return groceryService.getGrocery(id);
    }


    @GetMapping("/getAllGroceries")
    public List<Grocery> getAllGroceries() {
        return groceryService.getAllGroceries(); }


    @PostMapping("/{id}/review")
    public GroceryReview reviewGrocery(@PathVariable Integer id, @RequestBody GroceryReview review) {
        return groceryService.reviewGrocery(id, review);
    }

    @GetMapping("/{id}/review")
    public List<GroceryReview> reviewGrocery(@PathVariable Integer id) {
        return groceryService.getGroceryReviews(id);
    }

    @DeleteMapping("/{id}")
    public void deleteGrocery(@PathVariable Integer id) {
        groceryService.deleteGrocery(id);
    }


    @PostMapping()
    public Grocery getGrocery(@RequestBody Grocery grocery) {
        return groceryService.saveGrocery(grocery);
    }


    @GetMapping("/createData")
    public String createData() {
        return groceryService.createData();
    }


    @GetMapping("/getGroceryList/{searchText}")
    public List<Grocery> getAllGroceries(@PathVariable String searchText) {
        return groceryService.getAllGroceries(searchText);
    }
}
