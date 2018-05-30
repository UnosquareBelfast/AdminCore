package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.MandatoryHoliday;
import com.unosquare.admin_core.back_end.repository.MandatoryHolidayRepository;
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

        if (result.isPresent()) {
            return result.get();
        }
        return null;
    }

    public List<MandatoryHoliday> findMandatoryHolidaysByCountryIdAfterStartDate(int countryId, LocalDate startDate) {

        LocalDate endDate = LocalDate.of(startDate.getYear(), 12, 31);
        return mandatoryHolidayRepository.findByCountryIdAndDateBetween(countryId, startDate, endDate);
    }

    public List<MandatoryHoliday> findMandatoryHolidaysByCountryIdAndYear(int countryId, int year) {

        LocalDate startDate = LocalDate.of(year, 01, 01);
        LocalDate endDate = LocalDate.of(year, 12, 31);
        return mandatoryHolidayRepository.findByCountryIdAndDateBetween(countryId, startDate, endDate);
    }

    public void save(MandatoryHoliday mandatoryHoliday) {
        Preconditions.checkNotNull(mandatoryHoliday);
        mandatoryHolidayRepository.save(mandatoryHoliday);
    }

    public List<MandatoryHoliday> findByCountryIdAndDateBetween(int countryId, LocalDate rangeStart, LocalDate rangeEnd) {
        return mandatoryHolidayRepository.findByCountryIdAndDateBetween(countryId, rangeStart, rangeEnd);
    }

    public List<MandatoryHoliday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd) {
        return mandatoryHolidayRepository.findByDateBetween(rangeStart, rangeEnd);
    }
}
