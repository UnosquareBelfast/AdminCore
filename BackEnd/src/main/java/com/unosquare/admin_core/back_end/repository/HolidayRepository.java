package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Holiday;
import com.unosquare.admin_core.back_end.entity.HolidayStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HolidayRepository extends JpaRepository<Holiday, Integer> {

    List<Holiday> findByEmployee(Employee employee);

    Holiday findByEmployeeAndStartDateAndEndDate(Employee employee, LocalDate startDate, LocalDate endDate);

    List<Holiday> findByStartDateAfter(LocalDate startDate);

    List<Holiday> findByStartDateBefore(LocalDate startDate);

    Holiday findByStartDateAndEmployee(LocalDate startDate, Employee employee);

    List<Holiday> findByStartDateBetween(LocalDate rangeStart, LocalDate rangeEnd);

    List<Holiday> findByHolidayStatus(HolidayStatus holidayStatus);

    List<Holiday> findByHolidayStatusAndStartDate(HolidayStatus holidayStatus, LocalDate startDate);
}