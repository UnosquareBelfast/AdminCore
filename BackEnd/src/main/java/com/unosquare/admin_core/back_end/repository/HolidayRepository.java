package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Holiday;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HolidayRepository extends JpaRepository<Holiday, Integer> {

    List<Holiday> findByEmployee_EmployeeId(int employeeId);

    List<Holiday> findByDateAfter(LocalDate date);

    List<Holiday> findByDateBefore(LocalDate date);

    Holiday findByDateAndEmployeeEmployeeId(LocalDate date, int employeeId);

    List<Holiday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd);

    List<Holiday> findByHolidayStatus(HolidayStatus status);

    List<Holiday> findByHolidayStatusAndDateAfter(HolidayStatus status, LocalDate date);
}