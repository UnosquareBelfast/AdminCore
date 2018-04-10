package com.unosquare.adminCore.service;

import com.unosquare.adminCore.entity.Client;
import com.unosquare.adminCore.service.enums.TestClientEnum;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import com.unosquare.adminCore.repository.ClientRepository;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class TestClientService {

    @InjectMocks
    private ClientService testingObject;

    private Client client;
    @Mock
    private ClientRepository clientRepository;
    @Before
    public void initMocks(){
        MockitoAnnotations.initMocks(this);
        client = new Client();
        client.setClientName(TestClientEnum.name.toString());
        client.setContactEmail(TestClientEnum.email.toString());
        client.setStatus(TestClientEnum.status.toString());
        client.setTeamName(TestClientEnum.teamName.toString());
        client.setContactName(TestClientEnum.contactName.toString());
    }

    @Test
    public void testFindByIdClientNameSet() {
        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getClientName().equals(TestClientEnum.name.toString()));
    }

    @Test
    public void testFindByIdContactEmailSet() {
        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getContactEmail().equals(TestClientEnum.email.toString()));
    }

    @Test
    public void testFindByIdStatusSet() {
        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getStatus().equals(TestClientEnum.status.toString()));
    }

    @Test
    public void testFindByIdTeamNameSet() {
        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getTeamName().equals(TestClientEnum.teamName.toString()));
    }

    @Test
    public void testFindByIdContactNameSet() {
        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
        Assert.assertTrue(testingObject.findById(1).getContactName().equals(TestClientEnum.contactName.toString()));
    }

    @Test
    public void testSaveMethod() {
       Mockito.doReturn(client).when(clientRepository).save(client);
       testingObject.save(client);
    }

    @Test
    public void testFindAll() {
        List<Client> listOfAllClients= new ArrayList<>();
        listOfAllClients.add(client);
        listOfAllClients.add(client);

        Mockito.doReturn(listOfAllClients).when(clientRepository).findAll();
        Assert.assertTrue(testingObject.findAll().size()==2);
    }
}
