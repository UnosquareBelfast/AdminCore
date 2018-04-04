package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.MandatoryHoliday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MandatoryHolidayRepository extends JpaRepository<MandatoryHoliday, Integer> {

    List<MandatoryHoliday> findByCountryAndDateBetween(String country, LocalDate startDate, LocalDate endDate);
}
