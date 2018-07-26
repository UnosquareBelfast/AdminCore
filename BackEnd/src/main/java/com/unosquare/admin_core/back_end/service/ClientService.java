package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.ClientDTO;
import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.repository.ClientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<ClientDTO> findAll() {
        List clients = clientRepository.findAll();
        return mapClientsToDtos(clients);
    }

    public ClientDTO findById(int id) {
        Optional<Client> searchResult = clientRepository.findById(id);

        if (searchResult.isPresent()) {
            return modelMapper.map(searchResult.get(), ClientDTO.class);
        }
        return null;
    }

    public List<ClientDTO> findByClientNameContaining(String clientName) {
        List clients = clientRepository.findByClientNameContainingIgnoreCase(clientName);
        return mapClientsToDtos(clients);
    }

    public void save(ClientDTO client) {
        Preconditions.checkNotNull(client);
        Client newClient = modelMapper.map(client, Client.class);
        clientRepository.save(newClient);
    }

    private List<ClientDTO> mapClientsToDtos(List<Client> events) {
        return events.stream().map(event -> modelMapper.map(event, ClientDTO.class)).collect(Collectors.toList());
    }
}
