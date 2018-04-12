package com.unosquare.adminCore.service;

import com.unosquare.adminCore.entity.Client;
import com.unosquare.adminCore.entity.Contract;
import com.unosquare.adminCore.entity.ContractPK;
import com.unosquare.adminCore.repository.ContractRepository;
import com.unosquare.adminCore.service.enums.TestClientEnum;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class TestContractService {

    @InjectMocks
    private ContractService testingObject;

    private Contract contract;
    private ContractPK primaryKey;
    @Mock
    private ContractRepository contractRepository;
    private Client client;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        primaryKey = new ContractPK(1, 1);
        contract = new Contract();
        client = new Client();
        client.setClientName(TestClientEnum.name.toString());
        client.setContactEmail(TestClientEnum.email.toString());
        client.setStatus(TestClientEnum.status.toString());
        client.setTeamName(TestClientEnum.teamName.toString());
        client.setContactName(TestClientEnum.contactName.toString());
        contract.setClient(client);

    }


    @Test
    public void testFindByIdClientNameSet() {
        Mockito.doReturn(Optional.of(contract)).when(contractRepository).findById(Mockito.any(ContractPK.class));
        Assert.assertTrue(testingObject.findbyId(1, 1).getClient().getClientName().equals(TestClientEnum.name.toString()));
    }

    @Test
    public void testFindByIdContactEmailSet() {
        ContractPK primaryKey = new ContractPK(1, 1);
        Mockito.doReturn(Optional.of(contract)).when(contractRepository).findById(Mockito.any(ContractPK.class));
        Assert.assertTrue(testingObject.findbyId(1, 1).getClient().getContactEmail().equals(TestClientEnum.email.toString()));
    }

    @Test
    public void testFindByIdStatusSet() {
        Mockito.doReturn(Optional.of(contract)).when(contractRepository).findById(Mockito.any(ContractPK.class));
        Assert.assertTrue(testingObject.findbyId(1, 1).getClient().getStatus().equals(TestClientEnum.status.toString()));
    }

    @Test
    public void testFindByIdTeamNameSet() {
        Mockito.doReturn(Optional.of(contract)).when(contractRepository).findById(Mockito.any(ContractPK.class));
        Assert.assertTrue(testingObject.findbyId(1, 1).getClient().getTeamName().equals(TestClientEnum.teamName.toString()));
    }

    @Test
    public void testFindByIdContactNameSet() {
        Mockito.doReturn(Optional.of(contract)).when(contractRepository).findById(Mockito.any(ContractPK.class));
        Assert.assertTrue(testingObject.findbyId(1, 1).getClient().getContactName().equals(TestClientEnum.contactName.toString()));
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
