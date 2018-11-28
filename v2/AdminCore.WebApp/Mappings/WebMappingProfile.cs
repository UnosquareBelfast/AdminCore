﻿// --------------------------------------------------------------------------------------------------------------------
// <copyright file="WebMappingProfile.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The web mapping profile.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using AdminCore.Common.Message;
using AdminCore.DTOs;
using AdminCore.DTOs.Client;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.Team;
using AdminCore.WebApi.Models;
using AdminCore.WebApi.Models.Authentication;
using AdminCore.WebApi.Models.Client;
using AdminCore.WebApi.Models.Employee;
using AdminCore.WebApi.Models.Holiday;
using AdminCore.WebApi.Models.Team;
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

      CreateMap<EmployeeDto, LoginRequestModel>();

      CreateMap<RegisterEmployeeViewModel, EmployeeDto>();

      CreateMap<ClientDto, ClientViewModel>().ReverseMap();
      CreateMap<EmployeeViewModel, EmployeeDto>().ReverseMap();

      CreateMap<EmployeeViewModel, EmployeeDto>().ReverseMap();

      CreateMap<JwtAuthDto, JwtAuthViewModel>();

      CreateMap<RegisterEmployeeViewModel, EmployeeDto>();

      CreateMap<TeamDto, TeamViewModel>();

      CreateMap<EventDto, HolidayViewModel>().ReverseMap();
      CreateMap<ResponseMessage<EventDto>, HolidayViewModel>().ReverseMap();
    }
  }
}