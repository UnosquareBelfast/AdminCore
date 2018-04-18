package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Client;
import com.unosquare.adminCore.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    ClientService clientService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Client> findAllClients() {
        return clientService.findAll();
    }

    @GetMapping(value = "/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Client findClientById(@PathVariable("clientId") int id) {
        return clientService.findById(id);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createClient(@RequestBody Client client) {
        clientService.save(client);
    }

    @PutMapping(value = "/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateClient(@RequestBody Client client) {
        clientService.save(client);
    }

    @GetMapping(value = "/findByClientNameContaining/{clientName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Client> findByClientNameContaining(@PathVariable("clientName") String name) {
        return clientService.findByClientNameContaining(name);
    }

    @GetMapping(value = "/findByTeamNameContaining/{teamName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Client> findByTeamNameContaining(@PathVariable("teamName") String name) {
        return clientService.findByTeamNameContaining(name);
    }

    @GetMapping(value = "/findByContactNameContaining/{contactName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Client> findByContactNameContaining(@PathVariable("contactName") String name) {
        return clientService.findByContactNameContaining(name);
    }

    @GetMapping(value = "/findByStatus/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Client> findByStatus(@PathVariable("status") String status) {
        return clientService.findByStatus(status);
    }

}
