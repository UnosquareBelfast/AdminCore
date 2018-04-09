package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Contract;
import com.unosquare.adminCore.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/contracts")
public class ContractController {

    @Autowired
    ContractService contractService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Contract> findAllContracts() {
        return contractService.findAll();
    }

    @GetMapping(value = "/{employeeId}/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Contract findContractById(@PathVariable("employeeId") int employeeId, @PathVariable("clientId") int clientId) {
        return contractService.findbyId(employeeId, clientId);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createContract(@RequestBody Contract contract) {
        contractService.save(contract);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateContract(@RequestBody Contract contract) {
        contractService.save(contract);
    }
}
