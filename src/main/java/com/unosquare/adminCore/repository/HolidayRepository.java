package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;


public interface HolidayRepository extends JpaRepository<Holiday, Integer> {

    List<Holiday> findByEmployee_EmployeeId(int employeeId);

    List<Holiday> findByStartDateAfter(LocalDate date);

    List<Holiday> findByEndDateBefore(LocalDate date);

    List<Holiday> findByStartDateBetween(LocalDate rangeStart, LocalDate rangeEnd);

    List<Holiday> findByStatusIgnoreCase(String status);

    List<Holiday> findByStatusIgnoreCaseAndStartDateAfter(String status, LocalDate date);
}
