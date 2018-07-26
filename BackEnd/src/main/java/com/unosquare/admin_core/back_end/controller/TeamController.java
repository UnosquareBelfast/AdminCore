package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.TeamViewModel;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
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
    public List<TeamViewModel> findAllTeamsForClientId(@PathVariable("clientId") int clientId) {
        return mapTeamsToDtos(teamService.findByClient(clientId));
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void createTeam(@RequestBody TeamViewModel teamViewModel) {
        TeamDTO teamDto = modelMapper.map(teamViewModel, TeamDTO.class);
        teamService.save(teamDto);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void saveTeam(@RequestBody TeamViewModel teamViewModel) {
        TeamDTO team = modelMapper.map(teamViewModel, TeamDTO.class);
        teamService.save(team);
    }

    private List<TeamViewModel> mapTeamsToDtos(List<TeamDTO> teams) {
        return teams.stream().map(team -> modelMapper.map(team, TeamViewModel.class)).collect(Collectors.toList());
    }
}
