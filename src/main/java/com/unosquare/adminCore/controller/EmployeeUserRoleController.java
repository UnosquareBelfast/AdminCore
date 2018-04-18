package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.EmployeeUserRole;
import com.unosquare.adminCore.entity.MandatoryHoliday;
import com.unosquare.adminCore.service.EmployeeUserRoleService;
import com.unosquare.adminCore.service.MandatoryHolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/employeeUserRoles")
public class EmployeeUserRoleController {

    @Autowired
    EmployeeUserRoleService employeeUserRoleService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EmployeeUserRole> findAllEmployeeUserRoles() {
        return employeeUserRoleService.findAll();
    }

    @GetMapping(value = "/{employeeUserRoleId}/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EmployeeUserRole findEmployeeUserRoleById(@PathVariable("employeeUserRoleId") int employeeUserRoleId) {
        return employeeUserRoleService.findById(employeeUserRoleId);
    }
}
