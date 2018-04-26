package com.unosquare.adminCore.controller;

import com.unosquare.adminCore.dto.ClientDto;
import com.unosquare.adminCore.entity.Client;
import com.unosquare.adminCore.enums.ClientStatus;
import com.unosquare.adminCore.service.ClientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    ClientService clientService;

    private ModelMapper modelMapper = new ModelMapper();

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ClientDto> findAllClients() {
        return mapClientsToDtos(clientService.findAll());
    }

    @GetMapping(value = "/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ClientDto findClientById(@PathVariable("clientId") int id) {
        return modelMapper.map(clientService.findById(id), ClientDto.class);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createClient(@RequestBody ClientDto client) {
        clientService.save(modelMapper.map(client, Client.class));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateClient(@RequestBody ClientDto client) {
        clientService.save(modelMapper.map(client, Client.class));
    }

    @GetMapping(value = "/findByClientNameContaining/{clientName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<ClientDto> findByClientNameContaining(@PathVariable("clientName") String name) {
        return mapClientsToDtos(clientService.findByClientNameContaining(name));
    }

    @GetMapping(value = "/findByTeamNameContaining/{teamName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<ClientDto> findByTeamNameContaining(@PathVariable("teamName") String name) {
        return mapClientsToDtos(clientService.findByTeamNameContaining(name));
    }

    @GetMapping(value = "/findByContactNameContaining/{contactName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<ClientDto> findByContactNameContaining(@PathVariable("contactName") String name) {
        return mapClientsToDtos(clientService.findByContactNameContaining(name));
    }

   @GetMapping(value = "/findByClientStatus/{clientStatusId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<ClientDto> findByClientStatus(@PathVariable("clientStatusId") short clientStatusId) {
       return mapClientsToDtos(clientService.findByClientStatus(ClientStatus.fromId(clientStatusId)));
    }

    private List<ClientDto> mapClientsToDtos(List<Client> clients){

        return clients.stream().map(client -> modelMapper.map(client, ClientDto.class)).collect(Collectors.toList());
    }
}
