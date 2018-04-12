package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface HolidayRepository extends JpaRepository<Holiday, Integer> {

    List<Holiday> findByEmployee(Employee employee);
}
