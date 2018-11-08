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
        public List<TeamViewModel> FindAllTeamsForClientId(int clientId)
        {
            var teams = _teamService.FindByClient(clientId);
            return _mapper.Map<List<TeamDto>, List<TeamViewModel>>(teams);
        }

        [HttpPost]
        public void CreateTeam([FromBody] TeamViewModel teamViewModel)
        {
            TeamDto teamDto = _mapper.Map<TeamDto>(teamViewModel);
            _teamService.Save(teamDto);
        }

        [HttpPut]
        public void SaveTeam([FromBody] TeamViewModel teamViewModel)
        {
            TeamDto teamDto = _mapper.Map<TeamDto>(teamViewModel);
            _teamService.Save(teamDto);
        }
    }
}