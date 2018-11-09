// --------------------------------------------------------------------------------------------------------------------
// <copyright file="WebMappingProfile.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The web mapping profile.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.DTOs.Client;
using AdminCore.WebApi.Models.Authentication;
using AdminCore.WebApi.Models.Client;
using AdminCore.WebApi.Models.Employee;

namespace AdminCore.WebApi.Mappings
{
  using AdminCore.DTOs;
  using AdminCore.DTOs.Employee;
  using AdminCore.WebApi.Models;
  using AutoMapper;
    using AdminCore.DTOs.Team;
    using AdminCore.WebApi.Models.Team;

    /// <summary>
    /// The web mapping profile.
    /// </summary>
    public class WebMappingProfile : Profile
  {
    /// <summary>
    /// Initializes a new instance of the <see cref="WebMappingProfile"/> class.
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
    }
  }
}