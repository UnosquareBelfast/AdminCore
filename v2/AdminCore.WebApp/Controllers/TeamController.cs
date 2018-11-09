using System.Collections.Generic;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Team;
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

    [HttpGet("/{clientId}")]
    public IActionResult GetAllTeamsForClientId(int clientId)
    {
      return Ok();
    }

    [HttpPost]
    public IActionResult CreateTeam([FromBody] TeamViewModel teamViewModel)
    {
      return Ok();
    }

    [HttpPut]
    public IActionResult SaveTeam([FromBody] TeamViewModel teamViewModel)
    {
      return Ok();
    }
  }
}