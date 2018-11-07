// --------------------------------------------------------------------------------------------------------------------
// <copyright file="WebMappingProfile.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The web mapping profile.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.WebApi.Mappings
{
  using AdminCore.WebApi.Models;
  using AdminCore.DTOs;
  using AdminCore.DTOs.Employee;
  using AutoMapper;
  using AdminCore.DTOs.Team;
  using AdminCore.WebApi.Models.Team;
  using AdminCore.DTOs.Client;
  using AdminCore.DTOs.Event;
  using AdminCore.WebApi.Models.Client;
  using AdminCore.WebApi.Models.Event;

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
      CreateMap<EmployeeDto, LoginRequestModel>();

      CreateMap<RegisterEmployeeViewModel, EmployeeDto>();

      CreateMap<ClientDto, ClientViewModel>();

      CreateMap<JwtAuthDto, JwtAuthViewModel>();

      CreateMap<TeamDto, TeamViewModel>();

      CreateMap<EventDto, EventViewModel>();
    }
  }
}