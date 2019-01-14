using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Team;
using AdminCore.Services.Base;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace AdminCore.Services
{
  public class TeamService : BaseService, ITeamService
  {
    private readonly IMapper _mapper;

    public TeamService(IMapper mapper, IDatabaseContext databaseContext) : base(databaseContext)
    {
      _mapper = mapper;
    }

    public IList<TeamDto> GetAll()
    {
      var teams = DatabaseContext.TeamRepository.Get();
      return _mapper.Map<IList<TeamDto>>(teams);
    }

    public IList<TeamDto> GetByClientId(int clientId)
    {
      var teamDbEntry = DatabaseContext.TeamRepository.Get(x => x.ClientId == clientId);
      return _mapper.Map<IList<TeamDto>>(teamDbEntry);
    }

    public TeamDto Get(int id)
    {
      var teamDbEntry = GetByTeamId(id);
      return _mapper.Map<TeamDto>(teamDbEntry);
    }

    public void Save(TeamDto newTeamDto)
    {
      if (newTeamDto.TeamId == 0)
      {
        var newTeamEntry = _mapper.Map<Team>(newTeamDto);
        DatabaseContext.TeamRepository.Insert(newTeamEntry);
      }
      else
      {
        var team = GetByTeamId(newTeamDto.TeamId);
        _mapper.Map(newTeamDto, team);
      }

      DatabaseContext.SaveChanges();
    }

    private Team GetByTeamId(int teamId)
    {
      var teams = DatabaseContext.TeamRepository.Get(x => x.TeamId == teamId);
      return teams.Any() ? teams.First() : null;
    }
  }
}