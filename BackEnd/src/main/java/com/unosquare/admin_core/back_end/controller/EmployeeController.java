package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EmployeeDto;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EmployeeDto findEmployeeById(@PathVariable("employeeId") int id) {
        return modelMapper.map(employeeService.findById(id), EmployeeDto.class);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateEmployee(@RequestBody EmployeeDto employee) {
        employeeService.save(modelMapper.map(employee, Employee.class));
    }

    @GetMapping(value = "/findByStartDateAfter/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeDto> findByStartDateAfter(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return mapEployeessToDtos(employeeService.findByStartDateAfter(date));
    }

    @GetMapping(value = "/findByForenameAndSurname/{forename}/{surname}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeDto> findByForenameAndSurname(@PathVariable("forename") String forename, @PathVariable("surname") String surname) {
        return mapEployeessToDtos(employeeService.findByForenameAndSurname(forename, surname));
    }

    @GetMapping(value = "/findByStartDateBeforeOrSameDay/{date}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeDto> findByStartDateBeforeOrSameDay(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return mapEployeessToDtos(employeeService.findByStartDateBefore(date.plusDays(1)));
    }

    @GetMapping(value = "/findByCountry/{countryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeDto> findByCountry(@PathVariable("countryId") int countryId) {
        return mapEployeessToDtos(employeeService.findByCountry(Country.fromId(countryId)));
    }

    private List<EmployeeDto> mapEployeessToDtos(List<Employee> employees) {
        return employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
    }
}
