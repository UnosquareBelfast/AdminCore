package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;


public interface HolidayRepository extends JpaRepository<Holiday, Integer> {

    List<Holiday> findByEmployee_EmployeeId(int employeeId);

    List<Holiday> findByDateAfter(LocalDate date);

    List<Holiday> findByDateBefore(LocalDate date);

    Holiday findByDateAndEmployeeEmployeeId(LocalDate date, int employeeId);

    List<Holiday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd);

    List<Holiday> findByStatusIgnoreCase(String status);

    List<Holiday> findByStatusIgnoreCaseAndDateAfter(String status, LocalDate date);
}
