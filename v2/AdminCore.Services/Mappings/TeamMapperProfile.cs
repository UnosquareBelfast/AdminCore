using AdminCore.DAL.Models;
using AdminCore.DTOs.Team;

namespace AdminCore.Services.Mappings
{
    public class TeamMapperProfile : ClientMapperProfile
    {
        public TeamMapperProfile()
        {
            CreateMap<TeamDto, Team>().ReverseMap();
            // TODO: Additional mappings required
        }
    }
}
