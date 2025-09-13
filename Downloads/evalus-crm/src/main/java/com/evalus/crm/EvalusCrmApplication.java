package com.evalus.crm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class EvalusCrmApplication {
    public static void main(String[] args) {
        SpringApplication.run(EvalusCrmApplication.class, args);
    }
}
