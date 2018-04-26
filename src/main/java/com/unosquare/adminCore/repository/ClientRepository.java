package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.Client;
import com.unosquare.adminCore.enums.ClientStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ClientRepository extends JpaRepository<Client, Integer> {

    List<Client> findByClientNameContainingIgnoreCase(String clientName);

    List<Client> findByTeamNameContainingIgnoreCase(String teamname);

    List<Client> findByContactNameContainingIgnoreCase(String contactName);

    List<Client> findByClientStatus(ClientStatus status);
}
