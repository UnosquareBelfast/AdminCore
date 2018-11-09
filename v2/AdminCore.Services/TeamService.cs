using System;
using System.Collections.Generic;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Team;

namespace AdminCore.Services
{
  public class TeamService : ITeamService
  {
    public IList<TeamDto> GetAll()
    {
      throw new NotImplementedException();
    }

    public List<TeamDto> GetByClientId(int clientId)
    {
      throw new NotImplementedException();
    }

    public TeamDto Get(int id)
    {
      throw new NotImplementedException();
    }

    public TeamDto Save(TeamDto teamDto)
    {
      throw new NotImplementedException();
    }
  }
}