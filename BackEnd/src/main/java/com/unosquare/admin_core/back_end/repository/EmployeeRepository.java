package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Country;
import com.unosquare.admin_core.back_end.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    Employee findByEmailIgnoreCase(String email);

    List<Employee> findByForenameIgnoreCaseAndSurnameIgnoreCase(String forename, String surname);

    List<Employee> findByCountry(Country country);
}
