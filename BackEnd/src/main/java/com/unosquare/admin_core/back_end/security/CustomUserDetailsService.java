package com.unosquare.admin_core.back_end.security;

import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) {
        EmployeeDTO employee = employeeService.findByEmail(email);
        return UserPrincipal.create(modelMapper.map(employee, Employee.class));

    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(int id) {
        EmployeeDTO employee = employeeService.findById(id);
        return UserPrincipal.create(modelMapper.map(employee, Employee.class));
    }
}