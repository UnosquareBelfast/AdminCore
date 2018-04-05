package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.entity.Holiday;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.enums.HolidayStatus;
import com.unosquare.adminCore.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HolidayService {

    @Autowired
    MandatoryHolidayService mandatoryHolidayService;

    @Autowired
    HolidayRepository holidayRepository;

    public List<Holiday> findAll()
    {
        return holidayRepository.findAll();
    }

    public Holiday findById(int id)
    {
        return holidayRepository.findById(id).get();
    }

    public List<Holiday> findByEmployee(Employee employee)
    {
        return holidayRepository.findByEmployee(employee);
    }

    public void save(Holiday holiday)
    {
        Preconditions.checkNotNull(holiday);
        holidayRepository.save(holiday);
    }


    public Employee addMandatoryHolidaysForNewEmployee(Employee employee)
    {
        List<MandatoryHoliday> mandatoryHolidaysByCountryAfterStartDate = mandatoryHolidayService.findMandatoryHolidaysByCountryAfterStartDate(employee.getCountry(), employee.getStartDate());

        for(MandatoryHoliday mandatoryHoliday : mandatoryHolidaysByCountryAfterStartDate)
        {
            Holiday holiday = new Holiday(mandatoryHoliday.getDate(), mandatoryHoliday.getDate(), (short)1, employee, HolidayStatus.mandatory.toString());
            holidayRepository.save(holiday);
        }

        return employee;
    }
}

