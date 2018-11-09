using System;
using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Models.Team;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet("findTeamsForClient/{clientId}")]
    public IActionResult GetAllTeamsForClientId(int clientId)
    {
      throw new NotImplementedException();
    }

    [HttpPost]
    public IActionResult CreateTeam(CreateTeamViewModel teamViewModel)
    {
      throw new NotImplementedException();
    }

    [HttpPut]
    public IActionResult UpdateTeam(UpdateTeamViewModel teamViewModel)
    {
      throw new NotImplementedException();
    }
  }
}