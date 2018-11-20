using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Models.Team;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class TeamController : ControllerBase
  {
    private readonly IMapper _mapper;

    private readonly ITeamService _teamService;

    public TeamController(ITeamService teamService, IMapper mapper)
    {
      _teamService = teamService;
      _mapper = mapper;
    }

    [HttpPost]
    public IActionResult CreateTeam(CreateTeamViewModel teamViewModel)
    {
      return Ok();
    }

    [HttpGet("{clientId}")]
    public IActionResult GetAllTeamsForClientId(int clientId)
    {
      return Ok();
    }
  }
}