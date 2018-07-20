package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.ContractDto;
import com.unosquare.admin_core.back_end.entity.Contract;
import com.unosquare.admin_core.back_end.service.ContractService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/contracts")
public class ContractController {

    @Autowired
    ContractService contractService;

    @Autowired
    ModelMapper modelMapper;

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createContract(@RequestBody ContractDto contract) {
        contractService.save(modelMapper.map(contract, Contract.class));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateContract(@RequestBody ContractDto contract) {
        contractService.save(modelMapper.map(contract, Contract.class));
    }

    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteContract(@RequestBody ContractDto contract) {
        contractService.delete(modelMapper.map(contract, Contract.class));
    }

    @GetMapping(value = "/findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ContractDto> findByEmployeeId(@PathVariable("employeeId") int employeeId) {
        return mapContractsToDtos(contractService.findByEmployeeId(employeeId));
    }

    @GetMapping(value = "/findByEmployeeIdAndTeamId/{employeeId}/{teamID}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ContractDto> findByEmployeeIdAndTeamId(@PathVariable("employeeId") int employeeId, @PathVariable("teamId") int teamId) {
        return mapContractsToDtos(contractService.findByEmployeeIdAndTeamId(employeeId, teamId));
    }

    private List<ContractDto> mapContractsToDtos(List<Contract> contracts) {

        return contracts.stream().map(contract -> modelMapper.map(contract, ContractDto.class)).collect(Collectors.toList());
    }
}
