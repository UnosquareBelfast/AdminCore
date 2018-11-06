using AdminCore.DTOs.Team;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
    public interface ITeamService
    {
        IList<TeamDto> findAll();

        List<TeamDto> findByClient(int clientId);

        TeamDto findById(int id);

        TeamDto save(TeamDto teamDto);
    }
}