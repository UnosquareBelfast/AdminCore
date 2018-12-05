using System.Collections.Generic;
using AdminCore.DTOs.Team;

namespace AdminCore.Common.Interfaces
{
  public interface ITeamService
  {
    IList<TeamDto> GetAll();

    IList<TeamDto> GetByClientId(int clientId);

    TeamDto Get(int id);

    void Save(TeamDto teamDto);
  }
}