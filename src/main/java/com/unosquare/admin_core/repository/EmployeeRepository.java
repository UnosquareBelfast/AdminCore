package com.unosquare.admin_core.repository;

import com.unosquare.admin_core.entity.Employee;
import com.unosquare.admin_core.enums.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    Employee findByEmailIgnoreCase(String email);

    List<Employee> findByForenameIgnoreCaseAndSurnameIgnoreCase(String forename, String surname);

    List<Employee> findByStartDateAfter(LocalDate date);

    List<Employee> findByStartDateBefore(LocalDate date);

    List<Employee> findByCountry(Country country);
}
