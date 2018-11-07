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
  using AdminCore.DTOs;
  using AdminCore.DTOs.Employee;
  using AdminCore.WebApi.Models;
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

      CreateMap<EmployeeViewModel, EmployeeDto>();

      CreateMap<EmployeeDto, EmployeeViewModel>();

      CreateMap<JwtAuthDto, JwtAuthViewModel>();
    }
  }
}