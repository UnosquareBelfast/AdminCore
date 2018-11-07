using AdminCore.DTOs.Team;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
    public interface ITeamService
    {
        IList<TeamDto> FindAll();

        List<TeamDto> FindByClient(int clientId);

        TeamDto FindById(int id);

        TeamDto Save(TeamDto teamDto);
    }
}