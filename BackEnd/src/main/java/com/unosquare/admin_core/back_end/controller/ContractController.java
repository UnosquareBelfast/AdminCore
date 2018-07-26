package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.ContractViewModel;
import com.unosquare.admin_core.back_end.dto.ContractDTO;
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
    public void createContract(@RequestBody ContractViewModel contract) {
        ContractDTO contractDto = modelMapper.map(contract, ContractDTO.class);
        contractService.save(contractDto);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateContract(@RequestBody ContractViewModel contract) {
        ContractDTO contractDto = modelMapper.map(contract, ContractDTO.class);
        contractService.save(contractDto);
    }

    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void deleteContract(@RequestBody ContractViewModel contract) {
        ContractDTO contractDto = modelMapper.map(contract, ContractDTO.class);
        contractService.delete(contractDto);
    }

    @GetMapping(value = "/findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ContractViewModel> findByEmployeeId(@PathVariable("employeeId") int employeeId) {
        return mapContractsToViewModel(contractService.findByEmployeeId(employeeId));
    }

    @GetMapping(value = "/findByEmployeeIdAndTeamId/{employeeId}/{teamID}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ContractViewModel> findByEmployeeIdAndTeamId(@PathVariable("employeeId") int employeeId, @PathVariable("teamId") int teamId) {
        return mapContractsToViewModel(contractService.findByEmployeeIdAndTeamId(employeeId, teamId));
    }

    private List<ContractViewModel> mapContractsToViewModel(List<ContractDTO> contracts) {
        return contracts.stream().map(contract -> modelMapper.map(contract, ContractViewModel.class)).collect(Collectors.toList());
    }
}
