using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Team;
using AdminCore.WebApi.Models.Team;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace AdminCore.WebApi.Controllers
{
    [ApiController]
    [Authorize]
    [Route("[controller]")]
    public class TeamController : ControllerBase
    {
        private IMapper _mapper;
        private ITeamService _teamService;

        public TeamController(ITeamService teamService, IMapper mapper)
        {
            _teamService = teamService;
            _mapper = mapper;
        }

        [HttpGet("/{clientId}")]
        [AllowAnonymous]
        public List<TeamViewModel> findAllTeamsForClientId(int clientId)
        {
            return mapTeamsToDtos(_teamService.FindByClient(clientId));
        }

        [HttpPost]
        [AllowAnonymous]
        public void createTeam([FromBody] TeamViewModel teamViewModel)
        {
            TeamDto teamDto = _mapper.Map<TeamDto>(teamViewModel);
            _teamService.Save(teamDto);
        }

        [HttpPut]
        [AllowAnonymous]
        public void saveTeam([FromBody] TeamViewModel teamViewModel)
        {
            TeamDto teamDto = _mapper.Map<TeamDto>(teamViewModel);
            _teamService.Save(teamDto);
        }

        private List<TeamViewModel> mapTeamsToDtos(List<TeamDto> teams)
        {
            return teams.Select(x => _mapper.Map<TeamViewModel>(x)).ToList();
        }
    }
}