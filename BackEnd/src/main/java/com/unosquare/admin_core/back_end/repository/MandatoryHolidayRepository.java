//package com.unosquare.admin_core.back_end.repository;
//
//import com.unosquare.admin_core.back_end.entity.Country;
//import com.unosquare.admin_core.back_end.entity.MandatoryHoliday;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.time.LocalDate;
//import java.util.List;
//
//public interface MandatoryHolidayRepository extends JpaRepository<MandatoryHoliday, Integer> {
//
//    List<MandatoryHoliday> findByCountryAndDateBetween(Country country, LocalDate rangeStart, LocalDate rangeEnd);
//
//    List<MandatoryHoliday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd);
//}
