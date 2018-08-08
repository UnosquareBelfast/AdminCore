package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.EmployeeCredentialsViewModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    public EmployeeCredentialsViewModel employeeCredentialsViewModel;


    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String getUsername() {
        return employeeCredentialsViewModel.getEmail();
    }
}
