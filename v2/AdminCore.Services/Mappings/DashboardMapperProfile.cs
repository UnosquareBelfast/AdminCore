using AdminCore.DAL.Models;
using AdminCore.DTOs.Dashboard;
using AutoMapper;

namespace AdminCore.Services.Mappings
{
  public class DashboardMapperProfile : Profile
  {
    public DashboardMapperProfile()
    {
      CreateMap<Client, ClientSnapshotDto>().ReverseMap();
      CreateMap<Team, TeamSnapshotDto>().ReverseMap();
      CreateMap<Employee, EmployeeSnapshotDto>().ReverseMap();
    }
  }
}