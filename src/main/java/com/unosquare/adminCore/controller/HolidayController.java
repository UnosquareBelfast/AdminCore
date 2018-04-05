package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.entity.Holiday;
import com.unosquare.adminCore.service.HolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/holidays")
public class HolidayController {

    @Autowired
    HolidayService holidayService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday> findAllHolidays() {
        return holidayService.findAll();
    }

    @GetMapping(value = "/{holidayId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Holiday findHolidayById(@PathVariable("holidayId") int id) {
        return holidayService.findById(id);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Holiday>  findHolidayByEmployeeId(@PathVariable("employeeId") int employeeId) {
        Employee employee = new Employee();
        employee.setEmployeeId(employeeId);
        return holidayService.findByEmployee(employee);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createHoliday(@RequestBody Holiday holiday) {
        holidayService.save(holiday);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody Holiday holiday) {
        holidayService.save(holiday);
    }
}
