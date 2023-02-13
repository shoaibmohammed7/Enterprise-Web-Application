package com.iit.ewa.groceryhub.resources;

import com.iit.ewa.groceryhub.entity.Stores;
import com.iit.ewa.groceryhub.service.GroceryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/stores")
@AllArgsConstructor
public class StoreResource {

    private GroceryService groceryService;


    @GetMapping
    public List<Stores> getStores() {
        return groceryService.getStores();
    }

    @GetMapping("/allNearMe")
    public List<Stores> getAllnearMe(@RequestParam double lat, @RequestParam double lon) {
        return groceryService.getNearByStores(lat, lon);
    }

    @GetMapping("/nearMe")
    public Stores getnearMe(@RequestParam double lat, @RequestParam double lon) {
        return groceryService.getNearMeStores(lat, lon);
    }
    
    @GetMapping("/getStoresList/{searchText}")
    public List<Stores> searchStores(@PathVariable String searchText) {
    	return groceryService.searchStores(searchText);
    }
}
