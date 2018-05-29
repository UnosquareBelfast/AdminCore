package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HolidayRepository extends JpaRepository<Holiday, Integer> {

    List<Holiday> findByEmployeeId(int employeeId);

    List<Holiday> findByDateAfter(LocalDate date);

    List<Holiday> findByDateBefore(LocalDate date);

    Holiday findByDateAndEmployeeId(LocalDate date, int employeeId);

    List<Holiday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd);

    List<Holiday> findByHolidayStatusId(int statusId);

    List<Holiday> findByHolidayStatusIdAndDateAfter(int status, LocalDate date);
}