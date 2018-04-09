package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.Client;
import com.unosquare.adminCore.entity.Contract;
import com.unosquare.adminCore.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.OneToMany;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ClientService {

    @Autowired
    ClientRepository clientRepository;

    public List<Client> findAll()
    {
        return clientRepository.findAll();
    }

    public Client findById(int id)
    {
        Optional<Client> searchResult = clientRepository.findById(id);
        return searchResult.get();
    }

    public void save(Client client)
    {
        Preconditions.checkNotNull(client);
        clientRepository.save(client);
    }


}
