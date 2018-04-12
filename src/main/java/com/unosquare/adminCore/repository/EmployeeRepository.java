package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    Employee findByEmailIgnoreCase(String email);
}
