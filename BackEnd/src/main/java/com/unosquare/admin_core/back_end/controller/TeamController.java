package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.TeamDto;
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
    public List<TeamDto> findAllTeamsForClientId(@PathVariable("clientId") int clientId) {
        return mapTeamsToDtos(teamService.findByClient(clientId));
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createTeam(@RequestBody TeamDto team) {
        teamService.save(modelMapper.map(team, Team.class));
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void saveTeam(@RequestBody TeamDto team) {
        teamService.save(modelMapper.map(team, Team.class));
    }

    private List<TeamDto> mapTeamsToDtos(List<Team> teams) {
        return teams.stream().map(team -> modelMapper.map(team, TeamDto.class)).collect(Collectors.toList());
    }
}
