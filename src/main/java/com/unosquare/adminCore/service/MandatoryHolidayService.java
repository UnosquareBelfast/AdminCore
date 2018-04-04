package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.repository.MandatoryHolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class MandatoryHolidayService {

    @Autowired
    MandatoryHolidayRepository mandatoryHolidayRepository;

    public List<MandatoryHoliday> findAll(){
        return mandatoryHolidayRepository.findAll();
    }

    public List<MandatoryHoliday> findMandatoryHolidaysByCountryAfterStartDate(String country, LocalDate startDate) {

        LocalDate endDate = LocalDate.of(startDate.getYear(), 12, 31);
        List<MandatoryHoliday> mandatoryHolidays = mandatoryHolidayRepository.findByCountryAndDateBetween(country, startDate, endDate);

        return mandatoryHolidays;
    }

    public List<MandatoryHoliday> findMandatoryHolidaysByCountryAndYear(String country, int year) {

        LocalDate startDate = LocalDate.of(year, 01, 01);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        List<MandatoryHoliday> mandatoryHolidays = mandatoryHolidayRepository.findByCountryAndDateBetween(country, startDate, endDate);

        return mandatoryHolidays;
    }

    public void save(MandatoryHoliday mandatoryHoliday)
    {
        Preconditions.checkNotNull(mandatoryHoliday);
        mandatoryHolidayRepository.save(mandatoryHoliday);
    }



}
