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
        public IList<TeamDto> FindAll()
        {
            throw new NotImplementedException();
        }

        public List<TeamDto> FindByClient(int clientId)
        {
            throw new NotImplementedException();
        }

        public TeamDto FindById(int id)
        {
            throw new NotImplementedException();
        }

        public TeamDto Save(TeamDto teamDto)
        {
            throw new NotImplementedException();
        }

        private List<TeamDto> mapTeamsToDtos(List<Team> teams)
        {
            throw new NotImplementedException();
        }
    }
}
