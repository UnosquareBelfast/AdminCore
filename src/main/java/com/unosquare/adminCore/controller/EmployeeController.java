package com.unosquare.adminCore.controller;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
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

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createEmployee(@RequestBody Employee employee) {
        employee = employeeService.save(employee);
        employeeService.updateTotalHolidayForNewEmployee(employee);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateEmployee(@RequestBody Employee employee) {
        Preconditions.checkNotNull(employee);
        employeeService.save(employee);
    }
}
