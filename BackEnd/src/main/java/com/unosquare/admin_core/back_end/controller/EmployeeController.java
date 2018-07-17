package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EmployeeDto;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import com.unosquare.admin_core.back_end.viewModels.EmployeeViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    /*@GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE) OLD
    @ResponseBody
    public List<EmployeeDto> findAllEmployees() {
        return mapEployeessToDtos(employeeService.findAll());
    }*/

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)//New
    @ResponseBody
    public List<EmployeeViewModel> findAllEmployees() {
        return mapEployeessToDtos(employeeService.findAll());
    }

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EmployeeViewModel findEmployeeById(@PathVariable("employeeId") int id) {
        return modelMapper.map(employeeService.findById(id), EmployeeViewModel.class);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateEmployee(@RequestBody EmployeeViewModel employee) {
        employeeService.updateEmployee(employee);
    }

    @GetMapping(value = "/findByForenameAndSurname/{forename}/{surname}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeViewModel> findByForenameAndSurname(@PathVariable("forename") String forename, @PathVariable("surname") String surname) {
        return mapEployeessToDtos(employeeService.findByForenameAndSurname(forename, surname));
    }

    @GetMapping(value = "/findByCountry/{countryId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<EmployeeViewModel> findByCountry(@PathVariable("countryId") int countryId) {
        return mapEployeessToDtos(employeeService.findByCountry(Country.fromId(countryId)));
    }

   /* private List<EmployeeDto> mapEployeessToDtos(List<Employee> employees) { OLD
        return employees.stream().map(employee -> modelMapper.map(employee, EmployeeDto.class)).collect(Collectors.toList());
    }*/



      private List<EmployeeViewModel> mapEployeessToDtos(List<Employee> employees) {
          return employees.stream().map(employee -> modelMapper.map(employee, EmployeeViewModel.class)).collect(Collectors.toList());
    }
}
