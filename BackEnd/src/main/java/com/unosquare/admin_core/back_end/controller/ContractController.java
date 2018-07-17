package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.ContractDto;
import com.unosquare.admin_core.back_end.entity.Contract;
import com.unosquare.admin_core.back_end.enums.ContractStatus;
import com.unosquare.admin_core.back_end.service.ContractService;
import com.unosquare.admin_core.back_end.viewModels.ContractViewModel;
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
@RequestMapping("/contracts")
public class ContractController {

    @Autowired
    ContractService contractService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ContractViewModel> findAllContracts() {
        return mapContractsToViewModel(contractService.findAll());
    }

    @RequestMapping(method = RequestMethod.OPTIONS, value = "/*")
    @ResponseBody
    public ResponseEntity handleOptions() {
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(value = "/{employeeId}/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ContractViewModel findContractById(@PathVariable("employeeId") int employeeId, @PathVariable("clientId") int clientId) {
        return modelMapper.map(contractService.findById(employeeId, clientId), ContractViewModel.class);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createContract(@RequestBody ContractViewModel contract) {
        contractService.save(modelMapper.map(contract, Contract.class));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateContract(@RequestBody ContractViewModel contract) {
        contractService.save(modelMapper.map(contract, Contract.class));
    }

    @GetMapping(value = "/findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ContractViewModel> findByEmployeeId(@PathVariable("employeeId") int employeeId) {
        return mapContractsToViewModel(contractService.findByEmployeeId(employeeId));
    }

    @GetMapping(value = "/findByClientId/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ContractViewModel> findByClientId(@PathVariable("clientId") int clientId) {
        return mapContractsToViewModel(contractService.findByClientId(clientId));
    }

    @GetMapping(value = "/findByContractStatus/{contractStatusId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<ContractViewModel> findByClientStatus(@PathVariable("contractStatusId") int contractStatusId) {
        return mapContractsToViewModel(contractService.findByStatus(ContractStatus.fromId(contractStatusId)));
    }

    private List<ContractViewModel> mapContractsToViewModel(List<Contract> contracts) {

        return contracts.stream().map(contract -> modelMapper.map(contract, ContractViewModel.class)).collect(Collectors.toList());
    }
}
