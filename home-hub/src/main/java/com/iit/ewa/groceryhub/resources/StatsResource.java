package com.iit.ewa.groceryhub.resources;

import com.iit.ewa.groceryhub.entity.GroceryReview;
import com.iit.ewa.groceryhub.model.ChartPoint;
import com.iit.ewa.groceryhub.model.ReviewFilter;
import com.iit.ewa.groceryhub.service.GroceryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping("/stats")
@AllArgsConstructor
public class StatsResource {

    private GroceryService groceryService;

    @GetMapping("/count")
    public Map<String, Long> getCountStat() {
        return groceryService.getCountStat();
    }

    @GetMapping("/orderTrend")
    public List<ChartPoint> getOrderTrend(@RequestParam(required = false) LocalDateTime startDate, @RequestParam(required = false) LocalDateTime endDate) {
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }

        if (startDate == null) {
            startDate = endDate.plusDays(-30);
        }

        return groceryService.getOrderTrend(startDate.truncatedTo(ChronoUnit.DAYS), endDate.truncatedTo(ChronoUnit.DAYS));
    }

    @GetMapping("/orderSalesTrend")
    public List<ChartPoint> orderSalesTrend(@RequestParam(required = false) LocalDateTime startDate, @RequestParam(required = false) LocalDateTime endDate) {
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }

        if (startDate == null) {
            startDate = endDate.plusDays(-30);
        }

        return groceryService.orderSalesTrend(startDate, endDate);
    }

    @GetMapping("/orderByPinCode")
    public List<ChartPoint> orderByPinCode(@RequestParam(required = false) LocalDateTime startDate, @RequestParam(required = false) LocalDateTime endDate) {
        if (endDate == null) {
            endDate = LocalDateTime.now();
        }

        if (startDate == null) {
            startDate = endDate.plusDays(-30);
        }

        return groceryService.getOrderByPinCode(startDate.truncatedTo(ChronoUnit.DAYS), endDate.truncatedTo(ChronoUnit.DAYS));
    }

    @GetMapping("/topRatedProducts")
    public List<ChartPoint> topRatedProducts() {
        return groceryService.topRatedProducts();
    }

    @PostMapping("/reviewstats")
    public Object reviewStats(@RequestBody ReviewFilter filter) {
        return groceryService.reviewStats(filter);
    }
}
