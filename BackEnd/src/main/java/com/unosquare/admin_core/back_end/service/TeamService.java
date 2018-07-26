package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.entity.Team;
import com.unosquare.admin_core.back_end.repository.TeamRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeamService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    TeamRepository teamRepository;

    public List<TeamDTO> findAll() {
        List teams = teamRepository.findAll();
        return mapTeamsToDtos(teams);
    }

    public TeamDTO findById(int id) {
        Optional<Team> searchResult = teamRepository.findById(id);

        if (searchResult.isPresent()) {
            return modelMapper.map(searchResult.get(), TeamDTO.class);
        }
        return null;
    }

    public List<TeamDTO> findByClient(int clientId) {
        List teams = teamRepository.findByClient(new Client(clientId));
        return mapTeamsToDtos(teams);
    }

    public TeamDTO save(TeamDTO teamDto) {
        Preconditions.checkNotNull(teamDto);
        Team savedTeam;

        Optional<Team> existingTeam = teamRepository.findById(teamDto.getTeamId());
        if (existingTeam.isPresent()) {

            Team currentDetails = existingTeam.get();
            modelMapper.map(teamDto, currentDetails);
            savedTeam = teamRepository.save(currentDetails);
        }
        else {
            Team team = modelMapper.map(teamDto, Team.class);
            savedTeam = teamRepository.save(team);
        }

        return modelMapper.map(savedTeam, TeamDTO.class);
    }

    private List<TeamDTO> mapTeamsToDtos(List<Team> teams) {
        return teams.stream().map(team -> modelMapper.map(team, TeamDTO.class)).collect(Collectors.toList());
    }
}
