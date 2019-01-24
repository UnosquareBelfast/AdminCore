using AdminCore.DTOs;
using AdminCore.DTOs.Client;
using AdminCore.DTOs.Dashboard;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventMessage;
using AdminCore.DTOs.Team;
using AdminCore.WebApi.Models;
using AdminCore.WebApi.Models.Authentication;
using AdminCore.WebApi.Models.Client;
using AdminCore.WebApi.Models.Contract;
using AdminCore.WebApi.Models.Dashboard;
using AdminCore.WebApi.Models.Employee;
using AdminCore.WebApi.Models.Event;
using AdminCore.WebApi.Models.EventMessage;
using AdminCore.WebApi.Models.Team;
using AutoMapper;

namespace AdminCore.WebApi.Mappings
{
  public class WebMappingProfile : Profile
  {
    public WebMappingProfile()
    {
      CreateMap<ClientDto, ClientViewModel>();
      CreateMap<ClientDto, CreateClientViewModel>();

      CreateMap<EmployeeDto, LoginRequestModel>();

      CreateMap<RegisterEmployeeViewModel, EmployeeDto>();

      CreateMap<ClientDto, ClientViewModel>().ReverseMap();
      CreateMap<ClientDto, CreateClientViewModel>().ReverseMap();
      CreateMap<EmployeeViewModel, EmployeeDto>().ReverseMap();

      CreateMap<EmployeeViewModel, EmployeeDto>().ReverseMap();
      CreateMap<UpdateEmployeeViewModel, EmployeeDto>();
      CreateMap<UpdateEmployeeViewModel, EmployeeDto>().ReverseMap();

      CreateMap<JwtAuthDto, JwtAuthViewModel>();

      CreateMap<RegisterEmployeeViewModel, EmployeeDto>();

      CreateMap<TeamDto, TeamViewModel>();
      CreateMap<TeamDto, UpdateTeamViewModel>();
      CreateMap<TeamDto, CreateTeamViewModel>();

      CreateMap<TeamDto, TeamViewModel>().ReverseMap();
      CreateMap<TeamDto, UpdateTeamViewModel>().ReverseMap();
      CreateMap<TeamDto, CreateTeamViewModel>().ReverseMap();

      CreateMap<EventDto, EventViewModel>().ReverseMap();
      CreateMap<EventDto, RejectEventViewModel>().ReverseMap();
      CreateMap<EventDto, ApproveEventViewModel>().ReverseMap();
      CreateMap<EventDto, CancelEventViewModel>().ReverseMap();

      CreateMap<EventDateDto, EventDateViewModel>().ReverseMap();
      CreateMap<EventStatusDto, EventStatusViewModel>().ReverseMap();
      CreateMap<EventTypeDto, EventTypeViewModel>().ReverseMap();

      CreateMap<EventMessageDto, EventMessageViewModel>().ReverseMap();

      CreateMap<CreateEventViewModel, EventDateDto>().ReverseMap();
      CreateMap<UpdateEventViewModel, EventDateDto>().ReverseMap();
      CreateMap<HolidayStatsViewModel, HolidayStatsDto>().ReverseMap();

      CreateMap<ContractDto, ContractViewModel>();
      CreateMap<ContractDto, CreateContractViewModel>();
      CreateMap<ContractDto, UpdateContractViewModel>();

      CreateMap<ContractDto, ContractViewModel>().ReverseMap();
      CreateMap<ContractDto, CreateContractViewModel>().ReverseMap();
      CreateMap<ContractDto, UpdateContractViewModel>().ReverseMap();

      CreateMap<ClientSnapshotDto, ClientSnapshotViewModel>().ReverseMap();
      CreateMap<TeamSnapshotDto, TeamSnapshotViewModel>().ReverseMap();
      CreateMap<EmployeeSnapshotDto, EmployeeSnapshotViewModel>().ReverseMap();
    }
  }
}