package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.enums.Country;
import com.unosquare.adminCore.repository.MandatoryHolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MandatoryHolidayService {

    @Autowired
    MandatoryHolidayRepository mandatoryHolidayRepository;

    public List<MandatoryHoliday> findAll() {
        return mandatoryHolidayRepository.findAll();
    }

    public MandatoryHoliday findById(int id) {
        Optional<MandatoryHoliday> result = mandatoryHolidayRepository.findById(id);
        return result.get();
    }

    public List<MandatoryHoliday> findMandatoryHolidaysByCountryAfterStartDate(Country country, LocalDate startDate) {

        LocalDate endDate = LocalDate.of(startDate.getYear(), 12, 31);
        List<MandatoryHoliday> mandatoryHolidays = mandatoryHolidayRepository.findByCountryAndDateBetween(country, startDate, endDate);

        return mandatoryHolidays;
    }

    public List<MandatoryHoliday> findMandatoryHolidaysByCountryAndYear(Country country, int year) {

        LocalDate startDate = LocalDate.of(year, 01, 01);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        List<MandatoryHoliday> mandatoryHolidays = mandatoryHolidayRepository.findByCountryAndDateBetween(country, startDate, endDate);

        return mandatoryHolidays;
    }

    public void save(MandatoryHoliday mandatoryHoliday) {
        Preconditions.checkNotNull(mandatoryHoliday);
        mandatoryHolidayRepository.save(mandatoryHoliday);
    }

    public List<MandatoryHoliday> findByCountryAndDateBetween(Country country, LocalDate rangeStart, LocalDate rangeEnd) {
        return mandatoryHolidayRepository.findByCountryAndDateBetween(country, rangeStart, rangeEnd);
    }

    public List<MandatoryHoliday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd) {
        return mandatoryHolidayRepository.findByDateBetween(rangeStart, rangeEnd);
    }
}
