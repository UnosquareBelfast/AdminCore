package com.unosquare.adminCore;

import com.unosquare.adminCore.payload.SignUpRequest;
import com.unosquare.adminCore.service.EmployeeService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;

@SpringBootApplication
@EnableSwagger2
@EnableWebMvc
public class HrManagerServiceApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure (SpringApplicationBuilder builder) {
        return builder.sources(HrManagerServiceApplication.class);
    }

    public static void main(String[] args) {

        SpringApplication app = new SpringApplication(HrManagerServiceApplication.class);
        app.run(args);

/*        SignUpRequest signUpRequest = new SignUpRequest("swagger", "dev",
                "swaggerDev@unosquare.com",
                "$2a$10$5IX4MdZwEKf1WSbpTg5RzedWd9oUJQBCaNrUZRlThUTXYOCepSBoG",
                "Northern Ireland", true, true, LocalDate.of(2018, 01, 01));
        EmployeeService employeeService = new EmployeeService();
        employeeService.createNewEmployeeUser(signUpRequest);*/
    }
}
