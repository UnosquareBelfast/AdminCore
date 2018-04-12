package com.unosquare.adminCore;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;
import java.util.Collections;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build()
                .directModelSubstitute(LocalDate.class,
                        String.class)
                .apiInfo(apiInfo());
    }

    //String title, String description, String version, String termsOfServiceUrl, Contact contact, String license, String licenseUrl
    private ApiInfo apiInfo() {
        return new ApiInfo(
                "Admin Core Documentation",
                "Use authorization controller to generate token, default user login is username: swaggerDev@unosquare.com, password: un0squ@r35w@993r . 401 will be returned when trying out other controllers, use postman to test other controllers. When entering dates use the format YYYY-MM-DD",
                "",
                "W",
                new Contact("", "", ""),
                "", "");
    }
}