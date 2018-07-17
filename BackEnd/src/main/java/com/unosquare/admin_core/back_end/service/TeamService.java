package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.entity.Team;
import com.unosquare.admin_core.back_end.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    TeamRepository teamRepository;

    public List<Team> findAll() {
        return teamRepository.findAll();
    }

    public Team findById(int id) {
        Optional<Team> searchResult = teamRepository.findById(id);

        if (searchResult.isPresent()) {
            return searchResult.get();
        }
        return null;
    }

    public List<Team> findByClient(int clientId) {
        return teamRepository.findByClient(new Client(clientId));
    }

    public void save(Team team) {
        Preconditions.checkNotNull(team);
        teamRepository.save(team);
    }
}
