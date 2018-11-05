// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ServiceMapperProfile.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the ServiceMapperProfile type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.DTOs.Client;

namespace AdminCore.Services.Mappings
{
  using AdminCore.DAL.Models;
  using AdminCore.DTOs;
  using AdminCore.DTOs.Employee;

  using AutoMapper;

  /// <summary>
  /// The service mapper profile.
  /// </summary>
  public class ServiceMapperProfile : Profile
  {
    /// <summary>
    /// Initializes a new instance of the <see cref="ServiceMapperProfile"/> class.
    /// </summary>
    public ServiceMapperProfile()
    {
      CreateMap<Employee, EmployeeDto>();
      CreateMap<EmployeeDto, Employee>();

      CreateMap<CountryDto, Country>().ReverseMap();
      CreateMap<EmployeeStatusDto, EmployeeStatus>().ReverseMap();
      CreateMap<EmployeeRoleDto, EmployeeRole>().ReverseMap();
      
      // TODO: Move into separate profile.
      CreateMap<ClientDto, Client>().ReverseMap();
    }
  }
}