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
        return holidayRepository.findByEmployeeId(employeeId);
    }

    public Holiday findByEmployeeIdStartDataEndDate(int employeeId, LocalDate startDate, LocalDate endDate){
        return holidayRepository.findByEmployeeIdAndStartDateAndEndDate(employeeId, startDate, endDate);
    }

    public void save(Holiday holiday) {
        Preconditions.checkNotNull(holiday);

        holiday.getHolidayStatus().setHolidayStatusId(HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId());
        holiday.setDateCreated(LocalDate.now());
        holiday.setLastModified(LocalDate.now());

        holidayRepository.save(checkForHolidayWithSameDate(holiday));
    }

    private Holiday checkForHolidayWithSameDate(Holiday holiday) {
        Holiday holidayWithSameDate = holidayRepository.findByStartDateAndEmployeeId(holiday.getStartDate(), holiday.getEmployee().getEmployeeId());
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
        List<MandatoryHoliday> mandatoryHolidaysByCountryIdAfterStartDate = mandatoryHolidayService.findMandatoryHolidaysByCountryIdAfterStartDate(employee.getCountry().getCountryId(), employee.getStartDate());

        for (MandatoryHoliday mandatoryHoliday : mandatoryHolidaysByCountryIdAfterStartDate) {
            Holiday holiday = new Holiday(mandatoryHoliday.getDate(), mandatoryHoliday.getDate(), employee.getEmployeeId(), HolidayStatus.MANDATORY.getHolidayStatusId(), false);
            holidayRepository.save(holiday);
        }
    }

    public List<Holiday> findByDateAfter(LocalDate startDate) {
        return holidayRepository.findByStartDateAfter(startDate);
    }

    public List<Holiday> findByDateBefore(LocalDate startDate) {
        return holidayRepository.findByStartDateBefore(startDate.plusDays(1));
    }

    public List<Holiday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd) {
        return holidayRepository.findByStartDateBetween(rangeStart, rangeEnd);
    }

    public List<Holiday> findByStatus(HolidayStatus holidayStatus) {
        return holidayRepository.findByHolidayStatusId(holidayStatus.getHolidayStatusId());
    }

    public List<Holiday> findByStatusAndDateAfter(HolidayStatus holidayStatus, LocalDate startDate) {
        return holidayRepository.findByHolidayStatusIdAndStartDateAfter(holidayStatus.getHolidayStatusId(), startDate);
    }
}

