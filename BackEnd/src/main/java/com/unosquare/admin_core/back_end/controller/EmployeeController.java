package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EmployeeDto;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.enums.Countries;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EmployeeDto> findAllEmployees() {
        return mapEployeessToDtos(employeeService.findAll());
    }

    @GetMapping(value = "/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EmployeeDto findEmployeeById(@PathVariable("employeeId") int id) {
        return modelMapper.map(employeeService.findById(id), EmployeeDto.class);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateEmployee(@RequestBody EmployeeDto employee) {
        employeeService.updateEmployee(employee);
    }

    @GetMapping(value = "/findByForenameAndSurname/{forename}/{surname}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeDto> findByForenameAndSurname(@PathVariable("forename") String forename, @PathVariable("surname") String surname) {
        return mapEployeessToDtos(employeeService.findByForenameAndSurname(forename, surname));
    }

    @GetMapping(value = "/findByCountry/{countryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeDto> findByCountry(@PathVariable("countryId") int countryId) {
        return mapEployeessToDtos(employeeService.findByCountry(Countries.fromId(countryId)));
    }

    private List<EmployeeDto> mapEployeessToDtos(List<Employee> employees) {
        return employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
    }
}
