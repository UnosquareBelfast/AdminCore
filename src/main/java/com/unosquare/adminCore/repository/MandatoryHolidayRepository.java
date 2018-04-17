package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.MandatoryHoliday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MandatoryHolidayRepository extends JpaRepository<MandatoryHoliday, Integer> {

    List<MandatoryHoliday> findByCountryIgnoreCaseAndDateBetween(String country, LocalDate startDate, LocalDate endDate);

    List<MandatoryHoliday> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
