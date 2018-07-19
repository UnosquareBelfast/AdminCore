package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.TeamViewModel;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
import com.unosquare.admin_core.back_end.entity.Team;
import com.unosquare.admin_core.back_end.service.TeamService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/teams")
public class TeamController {

    @Autowired
    TeamService teamService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/{clientId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<TeamDTO> findAllTeamsForClientId(@PathVariable("clientId") int clientId) {
        return mapTeamsToDtos(teamService.findByClient(clientId));
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createTeam(@RequestBody TeamViewModel teamViewModelm) {
        TeamDTO team = modelMapper.map(teamViewModelm, TeamDTO.class);

        teamService.save(modelMapper.map(team, Team.class));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void saveTeam(@RequestBody TeamViewModel teamViewModelm) {
        TeamDTO team = modelMapper.map(teamViewModelm, TeamDTO.class);
        teamService.save(modelMapper.map(team, Team.class));
    }

    private List<TeamDTO> mapTeamsToDtos(List<Team> teams) {
        return teams.stream().map(team -> modelMapper.map(team, TeamDTO.class)).collect(Collectors.toList());
    }
}
