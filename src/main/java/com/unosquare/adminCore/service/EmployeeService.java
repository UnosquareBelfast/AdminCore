package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.controller.EmployeeController;
import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.repository.EmployeeRepository;
import com.unosquare.adminCore.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    HolidayService holidayService;

    @Autowired
    HolidayRepository holidayRepository;



    @Autowired
    EmployeeRepository employeeRepository;

    public List<Employee> findAll()
    {
        return employeeRepository.findAll();
    }

    public Employee findById(int id)
    {
        Optional<Employee> searchResult = employeeRepository.findById(id);
        return searchResult.get();
    }

    public Employee save(Employee employee)
    {
        Preconditions.checkNotNull(employee);
        return employeeRepository.save(employee);
    }

    public void updateTotalHolidayForNewEmployee(Employee employee)
    {
        employee = holidayService.addMandatoryHolidaysForNewEmployee(employee);
        int mandatoryHolidaysCount = holidayRepository.findByEmployee(employee).size();
        int maxHolidays = 33 - mandatoryHolidaysCount;
        employee.setTotalHolidays(calculateTotalHolidaysFromStartDate(employee, maxHolidays));
        employeeRepository.save(employee);
    }

    private short calculateTotalHolidaysFromStartDate(Employee employee, int maxHolidays) {
        short totalHolidays;
        if(employee.getStartDate().getYear() == LocalDate.now().getYear())
        {
            totalHolidays = (short) ((maxHolidays / 12 ) * ( 12 - employee.getStartDate().getMonthValue()));
        }
        else
        {
            totalHolidays = (short) maxHolidays;
        }
        return totalHolidays;
    }

}
