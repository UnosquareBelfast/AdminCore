package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Holiday;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import com.unosquare.admin_core.back_end.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HolidayService {

    @Autowired
    HolidayRepository holidayRepository;

    @PersistenceContext
    private EntityManager entityManager;

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
        return holidayRepository.findByEmployee(new Employee(employeeId));
    }

    public Holiday findByEmployeeIdStartDataEndDate(int employeeId, LocalDate startDate, LocalDate endDate){
        return holidayRepository.findByEmployeeAndStartDateAndEndDate(new Employee(employeeId), startDate, endDate);
    }

    public void save(int employeeId, Holiday holiday) {
        Preconditions.checkNotNull(holiday);

        holiday.setHolidayStatus(entityManager.find(com.unosquare.admin_core.back_end.entity.HolidayStatus.class, HolidayStatus.AWAITING_APPROVAL.getHolidayStatusId()));
        holiday.setDateCreated(LocalDate.now());
        holiday.setLastModified(LocalDate.now());

        holiday.setEmployee(entityManager.find(Employee.class, employeeId));

        holidayRepository.save(checkForHolidayWithSameDate(holiday));
    }

    private Holiday checkForHolidayWithSameDate(Holiday holiday) {
        Holiday holidayWithSameDate = holidayRepository.findByStartDateAndEmployee(holiday.getStartDate(), holiday.getEmployee());
        if (holidayWithSameDate != null) {
            holiday.setHolidayId(holidayWithSameDate.getHolidayId());
        }

        return holiday;
    }

    public List<Holiday> findByDateBetween(LocalDate rangeStart, LocalDate rangeEnd) {
        return holidayRepository.findByStartDateBetween(rangeStart, rangeEnd);
    }

    public List<Holiday> findByStatus(HolidayStatus holidayStatus) {
        return holidayRepository.findByHolidayStatus(new com.unosquare.admin_core.back_end.entity.HolidayStatus(holidayStatus.getHolidayStatusId()));
    }
}

