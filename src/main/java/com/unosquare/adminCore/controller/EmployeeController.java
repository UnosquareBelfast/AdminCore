package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Employee> findAllEmployees() {
        return employeeService.findAll();
    }

    @GetMapping(value = "/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Employee findEmployeeById(@PathVariable("employeeId") int id) {
        return employeeService.findById(id);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateEmployee(@RequestBody Employee employee) {
        employeeService.save(employee);
    }

    @GetMapping(value = "/findByStartDateAfter/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Employee> findByStartDateAfter(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return employeeService.findByStartDateAfter(date);
    }

    @GetMapping(value = "/findByForenameAndSurname/{forename}/{surname}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Employee> findByForenameAndSurname(@PathVariable("forename") String forename, @PathVariable("surname") String surname) {
        return employeeService.findByForenameAndSurname(forename, surname);
    }

    @GetMapping(value = "/findByStartDateBeforeOrSameDay/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Employee> findByStartDateBeforeOrSameDay(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return employeeService.findByStartDateBefore(date.plusDays(1));
    }

    @GetMapping(value = "/findByCountry/{country}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Employee> findByCountry(@PathVariable("country") String country) {
        return employeeService.findByCountry(country);
    }
}
