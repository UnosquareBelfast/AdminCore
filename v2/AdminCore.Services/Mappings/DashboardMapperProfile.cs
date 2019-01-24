using System;
using System.Collections.Generic;
using System.Text;
using AdminCore.DAL.Models;
using AdminCore.DTOs;
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
