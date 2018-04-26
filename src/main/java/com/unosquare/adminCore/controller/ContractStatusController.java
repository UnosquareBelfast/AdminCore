package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.enums.ContractStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/contractStatuses")
public class ContractStatusController {

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Map<ContractStatus, String> getContractStatuses() {
        Map<ContractStatus, String> statuses = new HashMap<>();

        for (ContractStatus status: ContractStatus.values()) {
            statuses.put(status, status.toString());
        }
        return statuses;
    }
    
}
