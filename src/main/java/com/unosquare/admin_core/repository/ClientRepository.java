package com.unosquare.admin_core.repository;

import com.unosquare.admin_core.entity.Client;
import com.unosquare.admin_core.enums.ClientStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ClientRepository extends JpaRepository<Client, Integer> {

    List<Client> findByClientNameContainingIgnoreCase(String clientName);

    List<Client> findByTeamNameContainingIgnoreCase(String teamname);

    List<Client> findByContactNameContainingIgnoreCase(String contactName);

    List<Client> findByClientStatus(ClientStatus status);
}
