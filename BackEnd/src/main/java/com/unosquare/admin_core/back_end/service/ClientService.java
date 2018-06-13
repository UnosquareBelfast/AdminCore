package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.enums.ClientStatus;
import com.unosquare.admin_core.back_end.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Client findById(int id) {
        Optional<Client> searchResult = clientRepository.findById(id);

        if (searchResult.isPresent()) {
            return searchResult.get();
        }
        return null;
    }

    public List<Client> findByClientNameContaining(String clientName) {
        return clientRepository.findByClientNameContainingIgnoreCase(clientName);
    }

    public List<Client> findByTeamNameContaining(String teamName) {
        return clientRepository.findByTeamNameContainingIgnoreCase(teamName);
    }

    public List<Client> findByContactNameContaining(String contactName) {
        return clientRepository.findByContactNameContainingIgnoreCase(contactName);
    }

    public List<Client> findByClientStatus(ClientStatus clientStatus) {
        return clientRepository.findByClientStatus(clientStatus);
    }

    public void save(Client client) {
        Preconditions.checkNotNull(client);
        clientRepository.save(client);
    }


}
