using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Models.Team;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using AdminCore.DTOs.Team;
using Microsoft.Extensions.Logging;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class TeamController : BaseController
  {
    private readonly ITeamService _teamService;

    public TeamController(ITeamService teamService, IMapper mapper) : base(mapper)
    {
      _teamService = teamService;
    }

    [HttpGet]
    public IActionResult GetAllTeams()
    {
      var teams = _teamService.GetAll();
      if (teams.Any())
      {
        return Ok(Mapper.Map<List<TeamViewModel>>(teams));
      }

      return StatusCode((int)HttpStatusCode.InternalServerError, "No teams exist");
    }

    [HttpGet("{id}")]
    public IActionResult GetTeamById(int id)
    {
      var team = _teamService.Get(id);
      if (team != null)
      {
        return Ok(Mapper.Map<TeamViewModel>(team));
      }

      return StatusCode((int)HttpStatusCode.InternalServerError, $"No team found with an ID of { id.ToString() }");
    }

    [HttpPost]
    public IActionResult CreateTeam(CreateTeamViewModel teamViewModel)
    {
      var teamDto = Mapper.Map<TeamDto>(teamViewModel);
      try
      {
        _teamService.Save(teamDto);
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong, team was not created.");
      }

      return Ok();
    }

    [HttpPut]
    public IActionResult UpdateTeam(UpdateTeamViewModel teamViewModel)
    {
      var teamDto = Mapper.Map<TeamDto>(teamViewModel);
      try
      {
        _teamService.Save(teamDto);
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong, team was not updated.");
      }
      return Ok();
    }

    [HttpGet("getByClientId/{clientId}")]
    public IActionResult GetAllTeamsForClientId(int clientId)
    {
      var teams = _teamService.GetByClientId(clientId);
      if (teams.Any())
      {
        return Ok(Mapper.Map<IList<TeamViewModel>>(teams));
      }

      return StatusCode((int)HttpStatusCode.InternalServerError, $"No teams found with client ID {clientId}");

    }
  }
}