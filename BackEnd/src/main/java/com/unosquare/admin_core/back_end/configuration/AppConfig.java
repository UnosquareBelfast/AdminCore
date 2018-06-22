package com.unosquare.admin_core.back_end.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;

@Configuration
public class AppConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public LocalEntityManagerFactoryBean entityManagerFactoryBean() {
        LocalEntityManagerFactoryBean factory = new LocalEntityManagerFactoryBean();
        factory.setPersistenceUnitName("entityManagerFactoryUnit");
        return factory;
    }
}
