package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.enums.EmployeeStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/employeeStatuses")
public class EmployeeStatusController {

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<EmployeeStatus, String> getEmployeeStatuses() {
        Map<EmployeeStatus, String> statuses = new HashMap<>();

        for (EmployeeStatus status: EmployeeStatus.values()) {
            statuses.put(status, status.toString());
        }
        return statuses;
    }
    
}
