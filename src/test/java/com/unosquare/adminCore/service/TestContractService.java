package com.unosquare.adminCore.service;

import com.unosquare.adminCore.entity.Contract;
import com.unosquare.adminCore.entity.ContractPK;
import com.unosquare.adminCore.enums.ContractStatus;
import com.unosquare.adminCore.repository.ContractRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class TestContractService {

    @InjectMocks
    private ContractService testingObject;

    private Contract contract;
    private ContractPK primaryKey;
    @Mock
    private ContractRepository contractRepository;
    private List<Contract> contracts;


    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        primaryKey = new ContractPK(1, 1);
        contract = new Contract(primaryKey, ContractStatus.active);
        contracts = Arrays.asList(contract);
    }


    @Test
    public void testFindByIdContractIdSet() {
        Mockito.doReturn(Optional.of(contract)).when(contractRepository).findById(Mockito.any(ContractPK.class));
        Assert.assertTrue(testingObject.findById(1, 1).getContractId().equals(primaryKey));
    }

    @Test
    public void testFindByIdStatusSet() {
        Mockito.doReturn(Optional.of(contract)).when(contractRepository).findById(Mockito.any(ContractPK.class));
        Assert.assertTrue(testingObject.findById(1, 1).getContractStatus().equals(ContractStatus.active));
    }

    @Test
    public void testFindByEmployeeIdContractIdSet() {
        Mockito.doReturn(contracts).when(contractRepository).findByEmployee_EmployeeId(1);

        Assert.assertTrue(testingObject.findByEmployeeId(1).
                get(0).getContractId().equals(primaryKey));
    }

    @Test
    public void testFindByEmployeeIdStatusSet() {
        Mockito.doReturn(contracts).when(contractRepository).findByEmployee_EmployeeId(1);

        Assert.assertTrue(testingObject.findByEmployeeId(1).
                get(0).getContractStatus().equals(ContractStatus.active));
    }

    @Test
    public void testFindByClientIdContractIdSet() {
        Mockito.doReturn(contracts).when(contractRepository).findByClient_ClientId(1);

        Assert.assertTrue(testingObject.findByClientId(1).
                get(0).getContractId().equals(primaryKey));
    }

    @Test
    public void testFindByClientEmployeeIdStatusSet() {
        Mockito.doReturn(contracts).when(contractRepository).findByClient_ClientId(1);

        Assert.assertTrue(testingObject.findByClientId(1).
                get(0).getContractStatus().equals(ContractStatus.active));
    }

    @Test
    public void testFindByStatusContractIdSet() {
        Mockito.doReturn(contracts).when(contractRepository).findByContractStatus(ContractStatus.active);

        Assert.assertTrue(testingObject.findByStatus(ContractStatus.active).
                get(0).getContractId().equals(primaryKey));
    }

    @Test
    public void testFindByStatusStatusSet() {
        Mockito.doReturn(contracts).when(contractRepository).findByContractStatus(ContractStatus.active);

        Assert.assertTrue(testingObject.findByStatus(ContractStatus.active).
                get(0).getContractStatus().equals(ContractStatus.active));
    }

    @Test
    public void testSaveMethod() {
        Mockito.doReturn(contract).when(contractRepository).save(contract);
        testingObject.save(contract);
    }

    @Test
    public void testFindAll() {
        List<Contract> listOfAllClients = new ArrayList<>();
        listOfAllClients.add(contract);
        listOfAllClients.add(contract);

        Mockito.doReturn(listOfAllClients).when(contractRepository).findAll();
        Assert.assertTrue(testingObject.findAll().size() == 2);
    }
}
