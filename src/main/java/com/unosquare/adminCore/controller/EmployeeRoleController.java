package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.enums.EmployeeRole;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/employeeRoles")
public class EmployeeRoleController {

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<EmployeeRole, String> getEmployeeRoles() {
        Map<EmployeeRole, String> roles = new HashMap<>();

        for (EmployeeRole status: EmployeeRole.values()) {
            roles.put(status, status.toString());
        }
        return roles;
    }
    
}
