package com.iit.ewa.groceryhub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
@EnableJpaRepositories
public class GroceryHubApplication {

	public static void main(String[] args) {
		SpringApplication.run(GroceryHubApplication.class, args);
	}

}
