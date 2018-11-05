// --------------------------------------------------------------------------------------------------------------------
// <copyright file="WebMappingProfile.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The web mapping profile.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.DTOs.Client;
using AdminCore.WebApi.Models.Client;

namespace AdminCore.WebApi.Mappings
{
  using AdminCore.WebApi.Models;
  using AdminCore.DTOs;
  using AdminCore.DTOs.Employee;
  using AutoMapper;

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
    }
  }
}