package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    Employee findByEmailIgnoreCase(String email);

    List<Employee> findByForenameIgnoreCaseAndSurnameIgnoreCase(String forename, String surname);

    List<Employee> findByStartDateAfter(LocalDate date);

    List<Employee> findByStartDateBefore(LocalDate date);

    List<Employee> findByCountryIgnoreCase(String country);
}
