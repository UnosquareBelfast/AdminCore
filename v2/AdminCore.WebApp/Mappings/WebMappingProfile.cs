// --------------------------------------------------------------------------------------------------------------------
// <copyright file="WebMappingProfile.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The web mapping profile.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.DTOs;
using AdminCore.DTOs.Client;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventMessage;
using AdminCore.DTOs.Team;
using AdminCore.WebApi.Models;
using AdminCore.WebApi.Models.Authentication;
using AdminCore.WebApi.Models.Client;
using AdminCore.WebApi.Models.Contract;
using AdminCore.WebApi.Models.Employee;
using AdminCore.WebApi.Models.Event;
using AdminCore.WebApi.Models.EventMessage;
using AdminCore.WebApi.Models.Holiday;
using AdminCore.WebApi.Models.Team;
using AdminCore.WebApi.Models.WorkingFromHome;
using AutoMapper;

namespace AdminCore.WebApi.Mappings
{
  /// <summary>
  ///   The web mapping profile.
  /// </summary>
  public class WebMappingProfile : Profile
  {
    /// <summary>
    ///   Initializes a new instance of the <see cref="WebMappingProfile" /> class.
    /// </summary>
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

      CreateMap<EventDto, HolidayViewModel>().ReverseMap();
      CreateMap<EventDto, RejectHolidayViewModel>().ReverseMap();
      CreateMap<EventDto, ApproveHolidayViewModel>().ReverseMap();
      CreateMap<EventDto, CancelHolidayViewModel>().ReverseMap();

      CreateMap<EventDateDto, EventDateViewModel>().ReverseMap();
      CreateMap<EventStatusDto, EventStatusViewModel>().ReverseMap();
      CreateMap<EventTypeDto, EventTypeViewModel>().ReverseMap();

      CreateMap<EventMessageDto, EventMessageViewModel>().ReverseMap();

      CreateMap<CreateHolidayViewModel, EventDateDto>().ReverseMap();
      CreateMap<UpdateEventViewModel, EventDateDto>().ReverseMap();
      CreateMap<HolidayStatsViewModel, HolidayStatsDto>().ReverseMap();

      CreateMap<WorkingFromHomeViewModel, EventDto>().ReverseMap();
      CreateMap<CreateWorkingFromHomeViewModel, EventDateDto>().ReverseMap();

      CreateMap<ContractDto, ContractViewModel>();
      CreateMap<ContractDto, CreateContractViewModel>();
      CreateMap<ContractDto, UpdateContractViewModel>();

      CreateMap<ContractDto, ContractViewModel>().ReverseMap();
      CreateMap<ContractDto, CreateContractViewModel>().ReverseMap();
      CreateMap<ContractDto, UpdateContractViewModel>().ReverseMap();
    }
  }
}