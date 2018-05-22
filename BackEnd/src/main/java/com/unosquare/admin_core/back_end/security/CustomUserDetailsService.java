package com.unosquare.admin_core.back_end.security;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    EmployeeService employeeService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        // Let people login with either username or email
        Employee user = employeeService.findByEmail(email);
        return UserPrincipal.create(user);

    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(int id) {
        Employee user = employeeService.findById(id);
        return UserPrincipal.create(user);
    }
}