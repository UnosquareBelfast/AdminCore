//package com.unosquare.admin_core.back_end.service;
//
//import com.unosquare.admin_core.back_end.entity.Client;
//import com.unosquare.admin_core.back_end.enums.ClientStatus;
//import com.unosquare.admin_core.back_end.repository.ClientRepository;
//import com.unosquare.admin_core.back_end.service.enums.TestClientEnum;
//import org.junit.Assert;
//import org.junit.Before;
//import org.junit.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.MockitoAnnotations;
//import org.springframework.context.annotation.ComponentScan;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//import java.util.Optional;
//
//@ComponentScan("com.unosquare.admin_core")
//public class TestClientService {
//
//    @InjectMocks
//    private ClientService testingObject;
//
//    private Client client;
//    private List<Client> clients;
//    @Mock
//    private ClientRepository clientRepository;
//
//    @Before
//    public void initMocks() {
//        MockitoAnnotations.initMocks(this);
//        client = new Client();
//        client.setClientName(TestClientEnum.name.toString());
//        client.setContactEmail(TestClientEnum.email.toString());
//        //client.setClientStatus(ClientStatus.ACTIVE);
//        client.setTeamName(TestClientEnum.teamName.toString());
//        client.setContactName(TestClientEnum.contactName.toString());
//
//        clients = Arrays.asList(client);
//    }
//
//    //region findById tests
//    @Test
//    public void testFindByIdClientNameSet() {
//        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
//        Assert.assertTrue(testingObject.findById(1).getClientName().equals(TestClientEnum.name.toString()));
//    }
//
//    @Test
//    public void testFindByIdContactEmailSet() {
//        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
//        Assert.assertTrue(testingObject.findById(1).getContactEmail().equals(TestClientEnum.email.toString()));
//    }
//
//    @Test
//    public void testFindByIdStatusSet() {
////        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
////        Assert.assertTrue(testingObject.findById(1).getClientStatus().equals(ClientStatus.ACTIVE));
//    }
//
//    @Test
//    public void testFindByIdTeamNameSet() {
//        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
//        Assert.assertTrue(testingObject.findById(1).getTeamName().equals(TestClientEnum.teamName.toString()));
//    }
//
//    @Test
//    public void testFindByIdContactNameSet() {
//        Mockito.doReturn(Optional.of(client)).when(clientRepository).findById(1);
//        Assert.assertTrue(testingObject.findById(1).getContactName().equals(TestClientEnum.contactName.toString()));
//    }
//    //endregion
//
//    @Test
//    public void testSaveMethod() {
//        Mockito.doReturn(client).when(clientRepository).save(client);
//        testingObject.save(client);
//    }
//
//    @Test
//    public void testFindAll() {
//        List<Client> listOfAllClients = new ArrayList<>();
//        listOfAllClients.add(client);
//        listOfAllClients.add(client);
//
//        Mockito.doReturn(listOfAllClients).when(clientRepository).findAll();
//        Assert.assertTrue(testingObject.findAll().size() == 2);
//    }
//
//    //region findByClientNameContaining tests
//    @Test
//    public void testFindByClientNameContainingClientNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByClientNameContainingIgnoreCase(TestClientEnum.name.toString());
//
//        Assert.assertTrue(testingObject.findByClientNameContaining(TestClientEnum.name.toString()).
//                get(0).getClientName().equals(TestClientEnum.name.toString()));
//    }
//
//    @Test
//    public void testFindByClientNameContactEmailSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByClientNameContainingIgnoreCase(TestClientEnum.name.toString());
//
//        Assert.assertTrue(testingObject.findByClientNameContaining(TestClientEnum.name.toString()).
//                get(0).getContactEmail().equals(TestClientEnum.email.toString()));
//    }
//
//    @Test
//    public void testFindByClientNameStatusSet() {
////        Mockito.doReturn(clients).when(clientRepository).
////                findByClientNameContainingIgnoreCase(TestClientEnum.name.toString());
////
////        Assert.assertTrue(testingObject.findByClientNameContaining(TestClientEnum.name.toString()).
////                get(0).getClientStatus().equals(ClientStatus.ACTIVE));
//    }
//
//    @Test
//    public void testFindByClientNameTeamNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByClientNameContainingIgnoreCase(TestClientEnum.name.toString());
//
//        Assert.assertTrue(testingObject.findByClientNameContaining(TestClientEnum.name.toString()).
//                get(0).getTeamName().equals(TestClientEnum.teamName.toString()));
//    }
//
//    @Test
//    public void testFindByClientNameContactNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByClientNameContainingIgnoreCase(TestClientEnum.name.toString());
//
//        Assert.assertTrue(testingObject.findByClientNameContaining(TestClientEnum.name.toString()).
//                get(0).getContactName().equals(TestClientEnum.contactName.toString()));
//    }
//    //endregion
//
//    //region findByTeamNameContaining tests
//    @Test
//    public void testFindByTeamNameContainingClientNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByTeamNameContainingIgnoreCase(TestClientEnum.teamName.toString());
//
//        Assert.assertTrue(testingObject.findByTeamNameContaining(TestClientEnum.teamName.toString()).
//                get(0).getClientName().equals(TestClientEnum.name.toString()));
//    }
//
//    @Test
//    public void testFindByTeamNameContactEmailSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByTeamNameContainingIgnoreCase(TestClientEnum.teamName.toString());
//
//        Assert.assertTrue(testingObject.findByTeamNameContaining(TestClientEnum.teamName.toString()).
//                get(0).getContactEmail().equals(TestClientEnum.email.toString()));
//    }
//
//    @Test
//    public void testFindByTeamNameStatusSet() {
////        Mockito.doReturn(clients).when(clientRepository).
////                findByTeamNameContainingIgnoreCase(TestClientEnum.teamName.toString());
////
////        Assert.assertTrue(testingObject.findByTeamNameContaining(TestClientEnum.teamName.toString()).
////                get(0).getClientStatus().equals(ClientStatus.ACTIVE));
//    }
//
//    @Test
//    public void testFindByTeamNameTeamNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByTeamNameContainingIgnoreCase(TestClientEnum.teamName.toString());
//
//        Assert.assertTrue(testingObject.findByTeamNameContaining(TestClientEnum.teamName.toString()).
//                get(0).getTeamName().equals(TestClientEnum.teamName.toString()));
//    }
//
//    @Test
//    public void testFindByTeamNameContactNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByTeamNameContainingIgnoreCase(TestClientEnum.teamName.toString());
//
//        Assert.assertTrue(testingObject.findByTeamNameContaining(TestClientEnum.teamName.toString()).
//                get(0).getContactName().equals(TestClientEnum.contactName.toString()));
//    }
//    //endregion
//
//    //region findByContactNameContaining tests
//    @Test
//    public void testFindByContactNameContainingClientNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByContactNameContainingIgnoreCase(TestClientEnum.contactName.toString());
//
//        Assert.assertTrue(testingObject.findByContactNameContaining(TestClientEnum.contactName.toString()).
//                get(0).getClientName().equals(TestClientEnum.name.toString()));
//    }
//
//    @Test
//    public void testFindByContactNameContainingContactEmailSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByContactNameContainingIgnoreCase(TestClientEnum.contactName.toString());
//
//        Assert.assertTrue(testingObject.findByContactNameContaining(TestClientEnum.contactName.toString()).
//                get(0).getContactEmail().equals(TestClientEnum.email.toString()));
//    }
//
//    @Test
//    public void testFindByContactNameContainingStatusSet() {
////        Mockito.doReturn(clients).when(clientRepository).
////                findByContactNameContainingIgnoreCase(TestClientEnum.contactName.toString());
////
////        Assert.assertTrue(testingObject.findByContactNameContaining(TestClientEnum.contactName.toString()).
////                get(0).getClientStatus().equals(ClientStatus.ACTIVE));
//    }
//
//    @Test
//    public void testFindByContactNameContainingTeamNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByContactNameContainingIgnoreCase(TestClientEnum.contactName.toString());
//
//        Assert.assertTrue(testingObject.findByContactNameContaining(TestClientEnum.contactName.toString()).
//                get(0).getTeamName().equals(TestClientEnum.teamName.toString()));
//    }
//
//    @Test
//    public void testFindByContactNameContainingNameSet() {
//        Mockito.doReturn(clients).when(clientRepository).
//                findByContactNameContainingIgnoreCase(TestClientEnum.contactName.toString());
//
//        Assert.assertTrue(testingObject.findByContactNameContaining(TestClientEnum.contactName.toString()).
//                get(0).getContactName().equals(TestClientEnum.contactName.toString()));
//    }
//    //endregion
//
//    //region findByClientStatus tests
//    @Test
//    public void testFindByStatusClientNameSet() {
////        Mockito.doReturn(clients).when(clientRepository).
////                findByClientStatus(ClientStatus.ACTIVE);
////
////        Assert.assertTrue(testingObject.findByClientStatus(ClientStatus.ACTIVE).
////                get(0).getClientName().equals(TestClientEnum.name.toString()));
//    }
//
//    @Test
//    public void testFindByStatusContactEmailSet() {
////        Mockito.doReturn(clients).when(clientRepository).
////                findByClientStatus(ClientStatus.ACTIVE);
////
////        Assert.assertTrue(testingObject.findByClientStatus(ClientStatus.ACTIVE).
////                get(0).getContactEmail().equals(TestClientEnum.email.toString()));
//    }
//
//    @Test
//    public void testFindByStatusStatusSet() {
////        Mockito.doReturn(clients).when(clientRepository).
////                findByClientStatus(ClientStatus.ACTIVE);
////
////        Assert.assertTrue(testingObject.findByClientStatus(ClientStatus.ACTIVE).
////                get(0).getClientStatus().equals(ClientStatus.ACTIVE));
//    }
//
//    @Test
//    public void testFindByStatusTeamNameSet() {
////        Mockito.doReturn(clients).when(clientRepository).
////                findByClientStatus(ClientStatus.ACTIVE);
////
////        Assert.assertTrue(testingObject.findByClientStatus(ClientStatus.ACTIVE).
////                get(0).getTeamName().equals(TestClientEnum.teamName.toString()));
//    }
//
//    @Test
//    public void testFindByStatusContactNameSet() {
////        Mockito.doReturn(clients).when(clientRepository).
////                findByClientStatus(ClientStatus.ACTIVE);
////
////        Assert.assertTrue(testingObject.findByClientStatus(ClientStatus.ACTIVE).
////                get(0).getContactName().equals(TestClientEnum.contactName.toString()));
//    }
//    //endregion
//}
