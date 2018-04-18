package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.EmployeeUserRole;
import com.unosquare.adminCore.repository.EmployeeUserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeUserRoleService {

    @Autowired
    EmployeeUserRoleRepository employeeUserRoleRepository;


    public List<EmployeeUserRole> findAll() {
        return employeeUserRoleRepository.findAll();
    }

    public EmployeeUserRole findById(int id) {
        Optional<EmployeeUserRole> searchResult = employeeUserRoleRepository.findById(id);
        return searchResult.get();
    }

    public EmployeeUserRole save(EmployeeUserRole employeeUserRole) {
        Preconditions.checkNotNull(employeeUserRole);
        EmployeeUserRole savedEmployee = employeeUserRoleRepository.save(employeeUserRole);
        return savedEmployee;
    }
}
