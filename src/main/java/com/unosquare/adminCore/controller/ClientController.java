package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.entity.Client;
import com.unosquare.adminCore.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
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
}
