package com.unosquare.adminCore.controller;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.Employee;
import com.unosquare.adminCore.repository.EmployeeRepository;
import com.unosquare.adminCore.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    EmployeeService employeeService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Employee> getAllEmployees() {
        List<Employee> allEmployees = employeeRepository.findAll();
        return allEmployees;
    }

    @GetMapping(value = "/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Employee findEmployeeById(@PathVariable("employeeId") int id) {
        Optional<Employee> searchResult = employeeRepository.findById(id);
        return searchResult.isPresent() ? searchResult.get() : null;
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createEmployee(@RequestBody Employee employee) {
        Preconditions.checkNotNull(employee);
        Employee createdEmployee = employeeRepository.save(employee);

        employeeService.updateTotalHolidayForNewEmployee(createdEmployee);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateEmployee(@RequestBody Employee employee) {
        Preconditions.checkNotNull(employee);
        employeeRepository.save(employee);
    }
}
