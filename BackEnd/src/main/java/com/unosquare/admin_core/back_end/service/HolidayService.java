package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Holiday;
import com.unosquare.admin_core.back_end.entity.MandatoryHoliday;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import com.unosquare.admin_core.back_end.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class HolidayService {

    @Autowired
    MandatoryHolidayService mandatoryHolidayService;

    @Autowired
    HolidayRepository holidayRepository;

    public List<Holiday> findAll() {
        return holidayRepository.findAll();
    }

    public Holiday findById(int id) {
        Optional<Holiday> result = holidayRepository.findById(id);
        if (result.isPresent()) {
            return result.get();
        }
        return null;
    }

    public List<Holiday> findByEmployee(int employeeId) {
        return holidayRepository.findByEmployee_EmployeeId(employeeId);
    }

    public void save(Holiday holiday) {
        Preconditions.checkNotNull(holiday);
        holidayRepository.save(checkForHolidayWithSameDate(holiday));
    }

    private Holiday checkForHolidayWithSameDate(Holiday holiday) {
        Holiday holidayWithSameDate = holidayRepository.findByDateAndEmployeeEmployeeId(holiday.getDate(), holiday.getEmployee().getEmployeeId());
        if (holidayWithSameDate != null) {
            holiday.setHolidayId(holidayWithSameDate.getHolidayId());
        }

        return holiday;
    }

    public void saveMultiple(List<Holiday> holidays) {
        Preconditions.checkNotNull(holidays);

        for (int i = 0; i < holidays.size(); i++) {
            holidays.set(i, checkForHolidayWithSameDate(holidays.get(i)));
        }

        holidayRepository.saveAll(holidays);
    }

    public void addMandatoryHolidaysForNewEmployee(Employee employee) {
        List<MandatoryHoliday> mandatoryHolidaysByCountryAfterStartDate = mandatoryHolidayService.findMandatoryHolidaysByCountryAfterStartDate(employee.getCountry(), employee.getStartDate());

        for (MandatoryHoliday mandatoryHoliday : mandatoryHolidaysByCountryAfterStartDate) {
            Holiday holiday = new Holiday(mandatoryHoliday.getDate(), employee, HolidayStatus.MANDATORY, false);
            holidayRepository.save(holiday);
        }
    }

    public List<Holiday> findByDateAfter(LocalDate date) {
        return holidayRepository.findByDateAfter(date);
    }

    public List<Holiday> findByDateBefore(LocalDate date) {
        return holidayRepository.findByDateBefore(date.plusDays(1));
    }

    public List<Holiday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd) {
        return holidayRepository.findByDateBetween(rangeStart, rangeEnd);
    }

    public List<Holiday> findByStatus(HolidayStatus status) {
        return holidayRepository.findByHolidayStatus(status);
    }

    public List<Holiday> findByStatusAndDateAfter(HolidayStatus status, LocalDate date) {
        return holidayRepository.findByHolidayStatusAndDateAfter(status, date);
    }
}

