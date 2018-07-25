package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.ClientViewModel;
import com.unosquare.admin_core.back_end.dto.ClientDTO;
import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.service.ClientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RestController
@RequestMapping("/clients")
public class ClientController {

    @Autowired
    ClientService clientService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ClientViewModel> findAllClients() {
        //return mapClientsToDtos(clientService.findAll());
        return null;
    }

    @GetMapping(value = "/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ClientViewModel findClientById(@PathVariable("clientId") int id) {
        return modelMapper.map(clientService.findById(id), ClientViewModel.class);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createClient(@RequestBody ClientViewModel clientViewModel) {
        ClientDTO client = modelMapper.map(clientViewModel, ClientDTO.class);
        clientService.save(modelMapper.map(client, Client.class));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateClient(@RequestBody ClientViewModel clientViewModel) {
        ClientDTO client = modelMapper.map(clientViewModel, ClientDTO.class);
        clientService.save(modelMapper.map(client, Client.class));
    }

    @GetMapping(value = "/findByClientNameContaining/{clientName}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<ClientViewModel> findByClientNameContaining(@PathVariable("clientName") String clientName) {
      //  return mapClientsToDtos(clientService.findByClientNameContaining(clientName));
        return null;
    }

    private List<ClientViewModel> mapClientsToDtos(List<ClientDTO> clients) {
        return clients.stream().map(client -> modelMapper.map(client, ClientViewModel.class)).collect(Collectors.toList());
    }
}
