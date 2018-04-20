package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.entity.Holiday;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.enums.HolidayStatus;
import com.unosquare.adminCore.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

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
        return holidayRepository.findById(id).get();
    }

    public List<Holiday> findByEmployee(int employeeId) {
        return holidayRepository.findByEmployee_EmployeeId(employeeId);
    }

    public void save(Holiday holiday) {
        Preconditions.checkNotNull(holiday);

        holiday = checkForHolidayWithSameDate(holiday);

        holidayRepository.save(holiday);
    }

    private Holiday checkForHolidayWithSameDate(Holiday holiday) {
        Holiday holidayWithSameDate = holidayRepository.findByDateAndEmployeeEmployeeId(holiday.getDate(), holiday.getEmployee().getEmployeeId());
        if(holidayWithSameDate != null)
        {
            holiday.setHolidayId(holidayWithSameDate.getHolidayId());
        }

        return holiday;
    }

    public void saveMultiple(List<Holiday> holidays) {
        Preconditions.checkNotNull(holidays);

        for(int i = 0; i < holidays.size(); i++)
        {
            holidays.set(i, checkForHolidayWithSameDate(holidays.get(i)));
        }

        holidayRepository.saveAll(holidays);
    }

    public void addMandatoryHolidaysForNewEmployee(Employee employee) {
        List<MandatoryHoliday> mandatoryHolidaysByCountryAfterStartDate = mandatoryHolidayService.findMandatoryHolidaysByCountryAfterStartDate(employee.getCountry(), employee.getStartDate());

        for (MandatoryHoliday mandatoryHoliday : mandatoryHolidaysByCountryAfterStartDate) {
            Holiday holiday = new Holiday(mandatoryHoliday.getDate(), employee, HolidayStatus.mandatory.toString(), false);
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

    public List<Holiday> findByStatus(String status) {
        return holidayRepository.findByStatusIgnoreCase(status);
    }

    public List<Holiday> findByStatusAndDateAfter(String status, LocalDate date) {
        return holidayRepository.findByStatusIgnoreCaseAndDateAfter(status, date);
    }
}

