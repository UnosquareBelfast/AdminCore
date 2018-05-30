package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HolidayRepository extends JpaRepository<Holiday, Integer> {

    List<Holiday> findByEmployeeId(int employeeId);

    Holiday findByEmployeeIdAndStartDateAndEndDate(int employeeId, LocalDate startDate, LocalDate endDate);

    List<Holiday> findByStartDateAfter(LocalDate date);

    List<Holiday> findByStartDateBefore(LocalDate date);

    Holiday findByStartDateAndEmployeeId(LocalDate date, int employeeId);

    List<Holiday> findByStartDateBetween(LocalDate rangeStart, LocalDate rangeEnd);

    List<Holiday> findByHolidayStatusId(int statusId);

    List<Holiday> findByHolidayStatusIdAndStartDateAfter(int status, LocalDate date);
}