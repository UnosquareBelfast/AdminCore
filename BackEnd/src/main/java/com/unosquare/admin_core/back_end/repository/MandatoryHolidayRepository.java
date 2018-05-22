package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.MandatoryHoliday;
import com.unosquare.admin_core.back_end.enums.Country;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface MandatoryHolidayRepository extends JpaRepository<MandatoryHoliday, Integer> {

    List<MandatoryHoliday> findByCountryAndDateBetween(Country country, LocalDate startDate, LocalDate endDate);

    List<MandatoryHoliday> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
