package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface TeamRepository extends JpaRepository<Team, Integer> {

    List<Team> findByClient(Client client);
}
