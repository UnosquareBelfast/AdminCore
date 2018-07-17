package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ClientRepository extends JpaRepository<Client, Integer> {

    List<Client> findByClientNameContainingIgnoreCase(String clientName);

    List<Client> findByContactNameContainingIgnoreCase(String contactName);
}
