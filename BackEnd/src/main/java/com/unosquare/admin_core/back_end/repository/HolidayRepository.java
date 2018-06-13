package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HolidayRepository extends JpaRepository<Holiday, Integer> {

    List<Holiday> findByEmployeeId(int employeeId);

    Holiday findByEmployeeIdAndStartDateAndEndDate(int employeeId, LocalDate startDate, LocalDate endDate);

    List<Holiday> findByStartDateAfter(LocalDate startDate);

    List<Holiday> findByStartDateBefore(LocalDate startDate);

    Holiday findByStartDateAndEmployeeId(LocalDate startDate, int employeeId);

    List<Holiday> findByStartDateBetween(LocalDate rangeStart, LocalDate rangeEnd);

    List<Holiday> findByHolidayStatusId(int holidayStatusId);

    List<Holiday> findByHolidayStatusIdAndStartDateAfter(int holidayStatusId, LocalDate startDate);
}