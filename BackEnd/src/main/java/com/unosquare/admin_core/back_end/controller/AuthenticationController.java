package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.RegisterEmployeeViewModel;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import com.unosquare.admin_core.back_end.ViewModels.JwtAuthenticationResponseViewModel;
import com.unosquare.admin_core.back_end.ViewModels.LoginRequestViewModel;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/authentication")
public class AuthenticationController {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    ModelMapper modelMapper;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponseViewModel> authenticateEmployee(@Valid @RequestBody LoginRequestViewModel loginRequest) {

        String jwt = employeeService.jwtSignIn(loginRequest.getEmail(), loginRequest.getPassword());
        return ResponseEntity.ok(new JwtAuthenticationResponseViewModel(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity registerEmployee(@RequestBody RegisterEmployeeViewModel registerEmployee) {
        if (employeeService.findByEmail(registerEmployee.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        EmployeeDTO employee = modelMapper.map(registerEmployee, EmployeeDTO.class);
        EmployeeDTO user = employeeService.createNewEmployee(employee);

        return ResponseEntity.ok(String.format("Employee registered:%s", user.getEmail()));
    }
}