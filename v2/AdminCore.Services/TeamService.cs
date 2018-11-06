using AdminCore.Common.Interfaces;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Team;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AdminCore.Services
{
    public class TeamService : ITeamService
    {
        public IList<TeamDto> findAll()
        {
            throw new NotImplementedException();
        }

        public List<TeamDto> findByClient(int clientId)
        {
            throw new NotImplementedException();
        }

        public TeamDto findById(int id)
        {
            throw new NotImplementedException();
        }

        public TeamDto save(TeamDto teamDto)
        {
            throw new NotImplementedException();
        }

        private List<TeamDto> mapTeamsToDtos(List<Team> teams)
        {
            throw new NotImplementedException();
        }
    }
}
