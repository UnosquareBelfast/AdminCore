package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.payload.ApiResponse;
import com.unosquare.adminCore.payload.JwtAuthenticationResponse;
import com.unosquare.adminCore.payload.LoginRequest;
import com.unosquare.adminCore.payload.SignUpRequest;
import com.unosquare.adminCore.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/authentication")
public class AuthenticationController {

    @Autowired
    EmployeeService employeeService;

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        String jwt = employeeService.jwtSignIn(loginRequest);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        if (employeeService.findByEmail(signUpRequest.getEmail()) != null) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }
        Employee user = employeeService.createNewEmployeeUser(signUpRequest);

        return ResponseEntity.ok(new JwtAuthenticationResponse(String.format("user added:%s", user.toString())));
    }

}